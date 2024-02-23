import app from "../../_46elks.app.mjs";
import { DEFAULT_POLLING_SOURCE_TIMER_INTERVAL } from "@pipedream/platform";

export default {
  key: "_46elks-new-account-data-change",
  name: "New Account Data Change",
  description: "Emit new event when data related to your 46elks account changes, primarily used to keep an eye out for changes in account balance, name, or email. [See the documentation](https://46elks.com/docs/overview)",
  version: "0.0.1",
  type: "source",
  dedupe: "unique",
  props: {
    app,
    db: "$.service.db",
    timer: {
      type: "$.interface.timer",
      label: "Polling Schedule",
      description: "How often to poll the API",
      default: {
        intervalSeconds: DEFAULT_POLLING_SOURCE_TIMER_INTERVAL,
      },
    },
  },
  methods: {
    generateMeta({
      balance, name, email, id,
    } = {}) {
      const ts = Date.now();
      return {
        id: `${id}-${ts}`,
        summary: `Balance: ${balance}, Name: ${name}, Email: ${email}`,
        ts,
      };
    },
    hasChangedAccount(previous, current) {
      return JSON.stringify(previous) !== JSON.stringify(current);
    },
  },
  // hooks: {
  //   async deploy() {
  //     // Fetch account details on first run
  //     const details = await this.app.getAccountDetails();
  //     this.db.set("accountDetails", details);
  //     this.$emit(details, this.generateMeta(details));
  //   },
  // },
  async run() {
    const {
      db,
      app,
      hasChangedAccount,
      $emit: emit,
    } = this;

    const previous = db.get("accountDetails") || {};
    const current = await app.getAccountDetails();

    if (hasChangedAccount(previous, current)) {
      emit(current, this.generateMeta(current));
      db.set("accountDetails", current);
    }
  },
};
