import { MQTTClient } from "./MQTTClient";
import { Device } from "./Device";


/** Tuya client */
export class Tuya extends MQTTClient {
    private devices: Device[];

    constructor(devices: Device[]) {
        super();
        this.devices = devices;
    }

    async build() {
        super.build().then(async client => {
            await client.subscribe("tuya");
            await client.publishToAllDevices("I'm Tuya");
        });
        return this;
    }

    async publishToAllDevices(message: string) {
        for (const { type, deviceId } of this.devices) {
            await this.publish(`device.${type}.${deviceId}`, message);
        }
    }

    handleMessage(topic: string, payload: Buffer): void {
        console.info(`Tuya received the following message on topic <${topic}>: ${payload}`);
    }
}