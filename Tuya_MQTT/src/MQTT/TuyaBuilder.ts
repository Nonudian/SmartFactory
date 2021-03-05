import { MQTTClientBuilder } from "./MQTTClientBuilder";
import { Device } from "./DeviceBuilder";


/** Tuya client builder */
export class TuyaBuilder extends MQTTClientBuilder {
    private devices: Device[];

    withDevices(devices: Device[]) {
        this.devices = devices;
        return this;
    }

    async build() {
        super.build().then(async tuya => {
            await tuya.subscribe("tuya");
            await tuya.publishToAllDevices("I'm Tuya");
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