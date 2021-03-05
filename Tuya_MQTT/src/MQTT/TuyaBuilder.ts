import { Packet } from "mqtt-packet";
import { MQTTClientBuilder } from "./MQTTClientBuilder";


export class TuyaBuilder extends MQTTClientBuilder {
    private devicesData: Object[];

    withDevices(devicesData: Object[]) {
        this.devicesData = devicesData;
        return this;
    }

    async build() {
        await super.build();
        return this;
    }

    async ready() {
        await this.client.subscribe("tuya");
    }

    async publishToAllDevices(message: string) {
        for (let device of this.devicesData) {
            await this.publishToOneDevice(device["type"], device["deviceId"], message);
        }
    }

    async publishToOneDevice(deviceType: string, deviceId: string, message: string) {
        await this.client.publish(`device.${deviceType}.${deviceId}`, message);
    }

    handleMessage(topic: string, payload: Buffer, packet: Packet): void {
        console.info(`tuya received the following message on topic {${topic}}: ${payload}`);
    }
}