import { MQTTClient } from "./MQTTClient";
import { Device } from "./Device";


// Tuya client
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
            setInterval(() => client.loop(), 2000);
        });
        return this;
    }

    async loop() {
        await this.switchLamp()
        await this.requireTemperature()
    }

    async switchLamp() {
        for (const { type, deviceId } of this.devices) {
            if(type === "lamp") {
                await this.publish(`device.${type}.${deviceId}`, "switch_led");
            }
        }
    }

    async requireTemperature() {
        for (const { type, deviceId } of this.devices) {
            if(type === "thermometer") {
                await this.publish(`device.${type}.${deviceId}`, "temp_current");
            }
        }
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