import { MQTTClient } from "./MQTTClient";

// Device client
export abstract class Device extends MQTTClient {
    type: string;
    deviceId: string;
    attrs: {};
    functions: { report: {}, issue: {} };

    protected constructor(type: string, deviceId: string, attrs: {}, functions: { report: {}, issue: {} }) {
        super();
        this.type = type;
        this.deviceId = deviceId;
        this.attrs = attrs;
        this.functions = functions;
    }

    async build() {
        super.build().then(async client => await client.subscribe(`device.${this.type}.${this.deviceId}`));
        return this;
    }

    // might need to change later (if we want to transfer params...)
    protected handleMessage(topic: string, payload: Buffer): void {
        console.info(`${this.type} <${this.deviceId}> received the following message on topic <${topic}>: ${payload}`);
        const fct = payload.toString();
        if(this.functions.issue.hasOwnProperty(fct)) {
            const params = this.functions.issue[fct].params;
            // boolean case
            if(params === 0) {
                this.attrs[this.functions.issue[fct].attr] = !this.attrs[this.functions.issue[fct].attr]
            }
            const toBuf = { attr: this.functions.issue[fct].attr, value: this.attrs[this.functions.issue[fct].attr] };
            this.publishToTuya(Buffer.from(JSON.stringify(toBuf)));
        } else if(this.functions.report.hasOwnProperty(fct)) {
            const toBuf = { attr: this.functions.report[fct].attr, value: this.attrs[this.functions.report[fct].attr] };
            this.publishToTuya(Buffer.from(JSON.stringify(toBuf)));
        } else {
            // error
        }
    }

    protected async publishToTuya(payload: Buffer) {
        await this.publish("tuya", payload);
    }
}