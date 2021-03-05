import Device from "./Device"
import {AsyncMqttClient} from "async-mqtt"
import {Packet} from "mqtt-packet"
const MQTT = require("async-mqtt")

class Thermometer extends Device {
    protected temp_current: number

    constructor(client: AsyncMqttClient, device_id: string, temp_current: number) {
        super(client, device_id)
        this.temp_current = temp_current
    }

    public static async build(device_id: string, temp_current: number): Promise<Thermometer> {
        const client = await MQTT.connectAsync("mqtt://test.mosquitto.org")
        return new Thermometer(client, device_id, temp_current)
    }

    handleMessage(topic: string, payload: Buffer, packet: Packet): void {
        console.info("thermometer "+this.device_id+", with temp_current {"+this.temp_current+"} received the following message on topic {"+topic+"}: "+payload)
    }
}

export default Thermometer