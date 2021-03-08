import { Device } from "./Device";

// Lamp specifications
export type LampType = {
    type: string;
    deviceId: string;
    attrs: { active: boolean; };
    functions: {
        report: {},
        issue: {
            switch_led: { attr: "active", params: 0 }
        }
    };
};

// Lamp client
export class Lamp extends Device {
    constructor({ type, deviceId, attrs, functions }: LampType) {
        super(type, deviceId, attrs, functions);
    }
}