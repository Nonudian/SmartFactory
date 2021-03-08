import { MQTTClient } from "./MQTTClient";
import { Device } from "./Device";

// Tuya client
export class Tuya extends MQTTClient {
    private readonly devices: Device[];

    constructor(devices: Device[]) {
        super();
        this.devices = devices;
    }

    async build() {
        super.build().then(async client => {
            await client.subscribe("tuya");
            setInterval(() => client.executeRandomCommandOnAllDevices(), 2000);
        });
        return this;
    }

    async executeRandomCommandOnAllDevices() {
        for (const { type, deviceId, attrs, functions } of this.devices) {
            const funcs = (Math.random() < 0.5) ? Object.keys(functions.report) : Object.keys(functions.issue);
            if(funcs.length === 0) continue; // there is no valid function to call on the device
            const toBuf = funcs[Math.floor(Math.random() * funcs.length)];
            await this.publish(`device.${type}.${deviceId}`, Buffer.from(toBuf));
        }
    }

    async publishToAllDevices(payload: Buffer) {
        for (const { type, deviceId } of this.devices) {
            await this.publish(`device.${type}.${deviceId}`, payload);
        }
    }

    handleMessage(topic: string, payload: Buffer): void {
        console.info(`Tuya received the following message on topic <${topic}>: ${payload}`);
    }
}