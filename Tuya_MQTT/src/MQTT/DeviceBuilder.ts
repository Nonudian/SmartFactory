import { MQTTClientBuilder } from "./MQTTClientBuilder";
import { Thermometer } from "./ThermometerBuilder";


/** Device object description */
export interface Device {
    type: string;
    deviceId: string;
    params: Thermometer;
}

/** Device client builder */
export abstract class DeviceBuilder extends MQTTClientBuilder {
    protected deviceId: string;

    withDeviceId(deviceId: string) {
        this.deviceId = deviceId;
        return this;
    }

    protected async publishToTuya(message: string) {
        await this.publish("tuya", message);
    }
}