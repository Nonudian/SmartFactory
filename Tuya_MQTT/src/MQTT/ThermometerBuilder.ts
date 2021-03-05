import { DeviceBuilder } from "./DeviceBuilder";


/** Thermometer object description */
export interface Thermometer {
    tempCurrent: number;
}

/** Thermometer client builder */
export class ThermometerBuilder extends DeviceBuilder {
    protected tempCurrent: number;

    withTemperature(tempCurrent: number) {
        this.tempCurrent = tempCurrent;
        return this;
    }

    async build() {
        super.build().then(async thermometer => {
            await thermometer.subscribe(`device.thermometer.${this.deviceId}`);
            setInterval(() => thermometer.publishToTuya(`I'm the device <${this.deviceId}>`), 3000);
        });
        return this;
    }

    handleMessage(topic: string, payload: Buffer): void {
        console.info(`Thermometer <${this.deviceId}> with current temperature ${this.tempCurrent}°C, received the following message on topic <${topic}>: ${payload}`);
    }
}