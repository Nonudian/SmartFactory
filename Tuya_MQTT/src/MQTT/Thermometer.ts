import { Device } from "./Device";


type ThermometerType = {
    type: string;
    deviceId: string;
    params: {
        temperature: number;
    };
};

/** Thermometer client */
export class Thermometer extends Device {
    protected temperature: number;

    constructor({ type, deviceId, params: { temperature } }: ThermometerType) {
        super(type, deviceId);
        this.temperature = temperature;
    }

    handleMessage(topic: string, payload: Buffer): void {
        console.info(`Thermometer <${this.deviceId}> with current temperature ${this.temperature}°C, received the following message on topic <${topic}>: ${payload}`);
    }
}