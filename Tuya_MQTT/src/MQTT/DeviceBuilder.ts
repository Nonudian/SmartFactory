import { MQTTClientBuilder } from "./MQTTClientBuilder";


export abstract class DeviceBuilder extends MQTTClientBuilder {
    protected deviceId: string;

    withDeviceId(deviceId: string) {
        this.deviceId = deviceId;
        return this;
    }

    async build() {
        await super.build();
        return this;
    }

    async publishToTuya(message: string) {
        await this.client.publish("tuya", message);
    }
}