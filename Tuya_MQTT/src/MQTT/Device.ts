import { MQTTClient } from "./MQTTClient";


// Device client
export abstract class Device extends MQTTClient {
    type: string;
    deviceId: string;

    constructor(type: string, deviceId: string) {
        super();
        this.type = type;
        this.deviceId = deviceId;
    }

    async build() {
        super.build().then(async client => await client.subscribe(`device.${this.type}.${this.deviceId}`));
        return this;
    }

    protected async publishToTuya(message: string) {
        await this.publish("tuya", message);
    }
}