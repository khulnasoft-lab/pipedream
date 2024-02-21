import taskScheduler from "../../../pipedream/sources/new-scheduled-tasks/new-scheduled-tasks.mjs";
import googleCalendar from "../../google_calendar.app.mjs";
import { DEFAULT_POLLING_SOURCE_TIMER_INTERVAL } from "@pipedream/platform";

export default {
  key: "google_calendar-upcoming-event-alert",
  name: "New Upcoming Event Alert",
  description: `Emit new event based on a time interval before an upcoming event in the calendar. This source uses Pipedream's Task Scheduler.
    [See the documentation](https://pipedream.com/docs/examples/waiting-to-execute-next-step-of-workflow/#step-1-create-a-task-scheduler-event-source) 
    for more information and instructions for connecting your Pipedream account.`,
  version: "0.0.5",
  type: "source",
  props: {
    pipedream: taskScheduler.props.pipedream,
    googleCalendar,
    db: "$.service.db",
    http: "$.interface.http",
    timer: {
      type: "$.interface.timer",
      default: {
        intervalSeconds: DEFAULT_POLLING_SOURCE_TIMER_INTERVAL, // poll source occasionally to schedule events created after source has been deployed
      },
    },
    calendarId: {
      propDefinition: [
        googleCalendar,
        "calendarId",
      ],
    },
    eventId: {
      propDefinition: [
        googleCalendar,
        "eventId",
        (c) => ({
          calendarId: c.calendarId,
        }),
      ],
      optional: true,
    },
    time: {
      type: "integer",
      label: "Minutes Before",
      description: "Number of minutes to trigger before the start of the calendar event.",
      min: 0,
    },
  },
  hooks: {
    async deactivate() {
      const ids = this._getScheduledEventIds();
      if (!ids?.length) {
        return;
      }
      for (const id of ids) {
        if (await this.deleteEvent({
          body: {
            id,
          },
        })) {
          console.log("Cancelled scheduled event");
        }
      }
      this._setScheduledEventIds();
    },
  },
  methods: {
    ...taskScheduler.methods,
    _getScheduledEventIds() {
      return this.db.get("scheduledEventIds");
    },
    _setScheduledEventIds(ids) {
      this.db.set("scheduledEventIds", ids);
    },
    _getScheduledCalendarEventIds() {
      return this.db.get("scheduledCalendarEventIds");
    },
    _setScheduledCalendarEventIds(ids) {
      this.db.set("scheduledCalendarEventIds", ids);
    },
    _hasDeployed() {
      const result = this.db.get("hasDeployed");
      this.db.set("hasDeployed", true);
      return result;
    },
    subtractMinutes(date, minutes) {
      return date.getTime() - minutes * 60000;
    },
    async getCalendarEvents() {
      const calendarEvents = [];
      if (this.eventId) {
        const item = await this.googleCalendar.getEvent({
          calendarId: this.calendarId,
          eventId: this.eventId,
        });
        calendarEvents.push(item);
      } else {
        const { data: { items } } = await this.googleCalendar.getEvents({
          calendarId: this.calendarId,
        });
        if (items?.length) {
          calendarEvents.push(...items);
        }
      }
      return calendarEvents;
    },
  },
  async run(event) {
    // self subscribe only on the first time
    if (!this._hasDeployed()) {
      await this.selfSubscribe();
    }

    const scheduledEventIds = this._getScheduledEventIds() || [];

    // incoming scheduled event
    if (event.$channel === this.selfChannel()) {
      const remainingScheduledEventIds = scheduledEventIds.filter((id) => id !== event["$id"]);
      this._setScheduledEventIds(remainingScheduledEventIds);
      this.emitEvent(event, `Upcoming ${event.summary} event`);
      return;
    }

    // schedule new events
    const scheduledCalendarEventIds = this._getScheduledCalendarEventIds() || {};
    const calendarEvents = await this.getCalendarEvents();

    for (const calendarEvent of calendarEvents) {
      const startTime = calendarEvent.start
        ? (new Date(calendarEvent.start.dateTime || calendarEvent.start.date))
        : null;
      if (!startTime
        || startTime.getTime() < Date.now()
        || scheduledCalendarEventIds[calendarEvent.id])
      {
        continue;
      }
      const later = new Date(this.subtractMinutes(startTime, this.time));

      const scheduledEventId = this.emitScheduleEvent(calendarEvent, later);
      scheduledEventIds.push(scheduledEventId);
      scheduledCalendarEventIds[calendarEvent.id] = true;
    }
    this._setScheduledEventIds(scheduledEventIds);
    this._setScheduledCalendarEventIds(scheduledCalendarEventIds);
  },
};
