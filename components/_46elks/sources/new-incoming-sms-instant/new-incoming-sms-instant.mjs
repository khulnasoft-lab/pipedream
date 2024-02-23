import app from "../../_46elks.app.mjs";

export default {
  key: "_46elks-new-incoming-sms-instant",
  name: "New Incoming SMS (Instant)",
  description: "Emit new event instantly when an SMS is received by a specific number linked to your 46elks account. [See the documentation](https://46elks.com/docs/receive-sms)",
  version: "0.0.3",
  type: "source",
  dedupe: "unique",
  props: {
    app,
    http: "$.interface.http",
    db: "$.service.db",
    to: {
      type: "string",
      label: "To Phone Number",
      description: "The phone number receiving the SMS message. The phone number of the recipient, in [E.164 format](https://46elks.com/kb/e164).",
    },
  },
  hooks: {
    async activate() {
      const {
        app,
        http,
        to,
      } = this;

      const { displayname: from } = await app.getAccountDetails();

      await app.sendSms({
        debug: true,
        data: {
          from,
          to,
          message: "webhook",
          whendelivered: http.endpoint,
          dryrun: "yes",
        },
      });
    },
  },
  methods: {
    processResource(resource) {
      this.$emit(resource, this.generateMeta(resource));
    },
    generateMeta(resource) {
      return {
        id: resource.id,
        summary: `New SMS: ${resource.id}`,
        ts: Date.parse(resource.created),
      };
    },
  },
  async run({ body }) {
    const { app } = this;
    const { id } = body;

    const sms = await app.getSms({
      debug: true,
      id,
    });

    this.processResource(sms);
  },
};
