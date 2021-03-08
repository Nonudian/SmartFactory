import { Device } from "./Device";


// Lamp specifications
export type LampType = {
    type: string;
    deviceId: string;
    params: {
        switchLed: boolean;
    };
};

// Lamp client
export class Lamp extends Device {
    protected switchLed: boolean;

    constructor({ type, deviceId, params: { switchLed } }: LampType) {
        super(type, deviceId);
        this.switchLed = switchLed;
    }

    async build() {
        super.build().then(async device => {
            setInterval(() => device.publishToTuya(`The lamp <${this.deviceId}> is currently ${this.switchLed ? `ON` : `OFF`}`), 2000);
        });
        return this;
    }

    handleMessage(topic: string, payload: Buffer): void {
        console.info(`Lamp <${this.deviceId}> received the following message on topic <${topic}>: ${payload}`);
    }
}