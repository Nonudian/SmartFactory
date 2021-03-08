import { Device } from "./Device";


// Thermometer specifications
export type ThermometerType = {
    type: string;
    deviceId: string;
    params: {
        temperature: number;
    };
};

// Thermometer client
export class Thermometer extends Device {
    protected temperature: number;

    constructor({ type, deviceId, params: { temperature } }: ThermometerType) {
        super(type, deviceId);
        this.temperature = temperature;
    }

    async build() {
        super.build().then(async device => {
            setInterval(() => device.publishToTuya(`The temperature of the thermometer <${this.deviceId}> is ${this.temperature}°C`), 2000);
        });
        return this;
    }

    handleMessage(topic: string, payload: Buffer): void {
        console.info(`Thermometer <${this.deviceId}> received the following message on topic <${topic}>: ${payload}`);
    }
}