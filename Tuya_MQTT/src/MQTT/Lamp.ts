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

    handleMessage(topic: string, payload: Buffer): void {
        console.info(`Lamp <${this.deviceId}> received the following message on topic <${topic}>: ${payload}`);
        switch(payload.toString()) {
            case "switch_led":
                this.switchLed = !this.switchLed;
                this.publishToTuya(`The lamp <${this.deviceId}> is currently ${this.switchLed ? `ON` : `OFF`}`)
                break;
        }
    }
}