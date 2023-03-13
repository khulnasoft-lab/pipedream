const CUSTOM_EVENT_TYPES = {
  MEETING_ALERT: "meeting.alert",
  MEETING_CREATED_BY_ME: "meeting.created.by_me",
  MEETING_CREATED_FOR_ME: "meeting.created.for_me",
  MEETING_UPDATED: "meeting.updated",
  MEETING_DELETED_BY_ME: "meeting.deleted.by_me",
  MEETING_DELETED_FOR_ME: "meeting.deleted.for_me",
  MEETING_STARTED: "meeting.started",
  MEETING_ENDED: "meeting.ended",
  MEETING_REGISTRATION_CREATED: "meeting.registration_created",
  MEETING_REGISTRATION_APPROVED: "meeting.registration_approved",
  MEETING_REGISTRATION_CANCELLED: "meeting.registration_cancelled",
  MEETING_REGISTRATION_DENIED: "meeting.registration_denied",
  MEETING_SHARING_STARTED_HOST: "meeting.sharing_started.host",
  MEETING_SHARING_STARTED_PARTICIPANT: "meeting.sharing_started.participant",
  MEETING_SHARING_ENDED_HOST: "meeting.sharing_ended.host",
  MEETING_SHARING_ENDED_PARTICIPANT: "meeting.sharing_ended.participant",
  MEETING_PARTICIPANT_JBH_JOINED: "meeting.participant_jbh_joined",
  MEETING_PARTICIPANT_JBH_WAITING: "meeting.participant_jbh_waiting",
  MEETING_PARTICIPANT_JOINED: "meeting.participant_joined",
  MEETING_PARTICIPANT_LEFT: "meeting.participant_left",
  MEETING_PARTICIPANT_JOINED_WAITING_ROOM: "meeting.participant_joined_waiting_room",
  MEETING_PARTICIPANT_ADMITTED: "meeting.participant_admitted",
  MEETING_PARTICIPANT_PUT_IN_WAITING_ROOM: "meeting.participant_put_in_waiting_room",
  MEETING_PARTICIPANT_LEFT_WAITING_ROOM: "meeting.participant_left_waiting_room",
  RECORDING_STARTED: "recording.started",
  RECORDING_PAUSED: "recording.paused",
  RECORDING_RESUMED: "recording.resumed",
  RECORDING_STOPPED: "recording.stopped",
  RECORDING_COMPLETED: "recording.completed",
  RECORDING_TRASHED_BY_ME: "recording.trashed.by_me",
  RECORDING_TRASHED_FOR_ME: "recording.trashed.for_me",
  RECORDING_DELETED_BY_ME: "recording.deleted.by_me",
  RECORDING_DELETED_FOR_ME: "recording.deleted.for_me",
  RECORDING_RECOVERED_BY_ME: "recording.recovered.by_me",
  RECORDING_RECOVERED_FOR_ME: "recording.recovered.for_me",
  RECORDING_TRANSCRIPT_COMPLETED: "recording.transcript_completed",
  RECORDING_REGISTRATION_CREATED: "recording.registration_created",
  RECORDING_REGISTRATION_APPROVED: "recording.registration_approved",
  RECORDING_REGISTRATION_DENIED: "recording.registration_denied",
  USER_UPDATED: "user.updated",
  USER_SETTINGS_UPDATED: "user.settings_updated",
  USER_SIGNED_IN: "user.signed_in",
  USER_SIGNED_OUT: "user.signed_out",
  WEBINAR_CREATED_BY_ME: "webinar.created.by_me",
  WEBINAR_CREATED_FOR_ME: "webinar.created.for_me",
  WEBINAR_UPDATED: "webinar.updated",
  WEBINAR_STARTED: "webinar.started",
  WEBINAR_ENDED: "webinar.ended",
  WEBINAR_ALERT: "webinar.alert",
  WEBINAR_SHARING_STARTED_HOST: "webinar.sharing_started.host",
  WEBINAR_SHARING_STARTED_PARTICIPANT: "webinar.sharing_started.participant",
  WEBINAR_SHARING_ENDED: "webinar.sharing_ended",
  WEBINAR_REGISTRATION_CREATED: "webinar.registration_created",
  WEBINAR_REGISTRATION_APPROVED: "webinar.registration_approved",
  WEBINAR_REGISTRATION_DENIED: "webinar.registration_denied",
  WEBINAR_REGISTRATION_CANCELLED: "webinar.registration_cancelled",
  WEBINAR_PARTICIPANT_JOINED: "webinar.participant_joined",
  WEBINAR_PARTICIPANT_LEFT: "webinar.participant_left",
  WEBINAR_DELETED_BY_ME: "webinar.deleted.by_me",
  WEBINAR_DELETED_FOR_ME: "webinar.deleted.for_me",
};

const PHONE_EVENT_TYPES = {
  PHONE_CALL_LOG_DELETED: "phone.call_log_deleted",
  PHONE_CALL_LOG_PERMANENTLY_DELETED: "phone.call_log_permanently_deleted",
  PHONE_CALLEE_ANSWERED: "phone.callee_answered",
  PHONE_CALLEE_CALL_LOG_COMPLETED: "phone.callee_call_log_completed",
  PHONE_CALLEE_ENDED: "phone.callee_ended",
  PHONE_CALLEE_HOLD: "phone.callee_hold",
  PHONE_CALLEE_MEETING_INVITING: "phone.callee_meeting_inviting",
  PHONE_CALLEE_MISSED: "phone.callee_missed",
  PHONE_CALLEE_MUTE: "phone.callee_mute",
  PHONE_CALLEE_REJECTED: "phone.callee_rejected",
  PHONE_CALLEE_RINGING: "phone.callee_ringing",
  PHONE_CALLEE_UNHOLD: "phone.callee_unhold",
  PHONE_CALLEE_UNMUTE: "phone.callee_unmute",
  PHONE_CALLER_CALL_LOG_COMPLETED: "phone.caller_call_log_completed",
  PHONE_CALLER_CONNECTED: "phone.caller_connected",
  PHONE_CALLER_ENDED: "phone.caller_ended",
  PHONE_CALLER_HOLD: "phone.caller_hold",
  PHONE_CALLER_MEETING_INVITING: "phone.caller_meeting_inviting",
  PHONE_CALLER_MUTE: "phone.caller_mute",
  PHONE_CALLER_RINGING: "phone.caller_ringing",
  PHONE_CALLER_UNHOLD: "phone.caller_unhold",
  PHONE_CALLER_UNMUTE: "phone.caller_unmute",
  PHONE_DEVICE_REGISTRATION: "phone.device_registration",
  PHONE_EMERGENCY_ALERT: "phone.emergency_alert",
  PHONE_GENERIC_DEVICE_PROVISION: "phone.generic_device_provision",
  PHONE_PEERING_NUMBER_CNAM_UPDATED: "phone.peering_number_cnam_updated",
  PHONE_PEERING_NUMBER_EMERGENCY_ADDRESS_UPDATED: "phone.peering_number_emergency_address_updated",
  PHONE_RECORDING_COMPLETED: "phone.recording_completed",
  PHONE_RECORDING_DELETED: "phone.recording_deleted",
  PHONE_RECORDING_PAUSED: "phone.recording_paused",
  PHONE_RECORDING_PERMANENTLY_DELETED: "phone.recording_permanently_deleted",
  PHONE_RECORDING_RESUMED: "phone.recording_resumed",
  PHONE_RECORDING_STARTED: "phone.recording_started",
  PHONE_RECORDING_STOPPED: "phone.recording_stopped",
  PHONE_RECORDING_TRANSCRIPT_COMPLETED: "phone.recording_transcript_completed",
  PHONE_SMS_RECEIVED: "phone.sms_received",
  PHONE_SMS_SENT: "phone.sms_sent",
  PHONE_VOICEMAIL_DELETED: "phone.voicemail_deleted",
  PHONE_VOICEMAIL_PERMANENTLY_DELETED: "phone.voicemail_permanently_deleted",
  PHONE_VOICEMAIL_RECEIVED: "phone.voicemail_received",
  PHONE_VOICEMAIL_TRANSCRIPT_COMPLETED: "phone.voicemail_transcript_completed",
  PHONE_WARM_TRANSFER_ACCEPTED: "phone.warm_transfer_accepted",
};

export default {
  CUSTOM_EVENT_TYPES,
  PHONE_EVENT_TYPES,
};
