import { axios } from "@pipedream/platform";
import constants from "./common/constants.mjs";

export default {
  type: "app",
  app: "_46elks",
  propDefinitions: {
    number: {
      type: "string",
      label: "Phone Number",
      description: "A phone number",
      async options({ prevContext }) {
        const { nextStart } = prevContext;

        if (nextStart === null) {
          return [];
        }

        const {
          data,
          next,
        } = await this.listNumbers({
          params: {
            start: nextStart,
            limit: 100,
          },
        });

        const options = data.map(({
          name: label, number: value,
        }) => ({
          label,
          value,
        }));

        return {
          options,
          context: {
            nextStart: next || null,
          },
        };
      },
    },
    // from: {
    //   type: "string",
    //   label: "From Phone Number",
    //   description: "The phone number initiating the call or sending the SMS message. A valid phone number in [E.164 format](https://46elks.com/kb/e164). Can be one of your voice enabled 46elks numbers, the phone number you signed up with, or an unlocked number.",
    // },
    // to: {
    //   type: "string",
    //   label: "To Phone Number",
    //   description: "The phone number receiving the call or SMS message. The phone number of the recipient, in [E.164 format](https://46elks.com/kb/e164).",
    // },
    message: {
      type: "string",
      label: "Message Text",
      description: "The text of the SMS message to send",
    },
    webhookUrl: {
      type: "string",
      label: "Webhook URL",
      description: "This webhook URL will receive a `POST` request every time the delivery status changes.",
    },
  },
  methods: {
    getUrl(path) {
      return `${constants.BASE_URL}${constants.VERSION_PATH}${path}`;
    },
    getAuth() {
      const {
        username,
        password,
      } = this.$auth;
      return {
        username,
        password,
      };
    },
    getHeaders(headers) {
      return {
        ...headers,
        "Content-Type": "application/x-www-form-urlencoded",
      };
    },
    _makeRequest({
      $ = this, path, headers, ...args
    } = {}) {
      const config = {
        ...args,
        url: this.getUrl(path),
        headers: this.getHeaders(headers),
        auth: this.getAuth(),
      };
      return axios($, config);
    },
    post({
      data, ...args
    } = {}) {
      const dataParams = new URLSearchParams(data);
      return this._makeRequest({
        method: "POST",
        data: dataParams.toString(),
        ...args,
      });
    },
    sendSms(args = {}) {
      return this.post({
        path: "/sms",
        ...args,
      });
    },
    getSms({
      id, ...args
    } = {}) {
      return this._makeRequest({
        path: `/sms/${id}`,
        ...args,
      });
    },
    makeCall(args = {}) {
      return this.post({
        path: "/calls",
        ...args,
      });
    },
    getAccountDetails() {
      return this._makeRequest({
        path: "/me",
      });
    },
    listNumbers(args = {}) {
      return this._makeRequest({
        path: "/numbers",
        ...args,
      });
    },
  },
};
