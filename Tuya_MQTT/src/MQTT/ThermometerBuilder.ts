import { Packet } from "mqtt-packet";
import { DeviceBuilder } from "./DeviceBuilder";


export class ThermometerBuilder extends DeviceBuilder {
    protected tempCurrent: number;

    withTemperature(tempCurrent: number) {
        this.tempCurrent = tempCurrent;
        return this;
    }

    handleMessage(topic: string, payload: Buffer, packet: Packet): void {
        console.info("thermometer " + this.deviceId + ", with current temperature {" + this.tempCurrent + "} received the following message on topic {" + topic + "}: " + payload);
    }
}