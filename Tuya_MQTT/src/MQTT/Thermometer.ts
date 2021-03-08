import { Device } from "./Device";

// Thermometer specifications
export type ThermometerType = {
    type: string;
    deviceId: string;
    attrs: { temperature: number; };
    functions: {
        report: {
            temp_current: { attr: "temperature", params: 0 }
        },
        issue: {}
    };
};

// Thermometer client
export class Thermometer extends Device {
    constructor({ type, deviceId, attrs, functions }: ThermometerType) {
        super(type, deviceId, attrs, functions);
    }
}