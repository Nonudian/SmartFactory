import MQTTDevice from "./MQTTDevice";
import {AsyncMqttClient} from "async-mqtt";
import {Packet} from "mqtt-packet";
const MQTT = require("async-mqtt");

class MQTTThermometer extends MQTTDevice {
    protected temp_current: number;

    constructor(device_id: string, client: AsyncMqttClient, temp_current: number) {
        super(device_id, client);
        this.temp_current = temp_current;
    }

    public static async build(device_id: string, temp_current: number): Promise<MQTTThermometer> {
        const client = await MQTT.connectAsync("mqtt://test.mosquitto.org")
        return new MQTTThermometer(device_id, client, temp_current)
    }

    handleMessage(topic: string, payload: Buffer, packet: Packet) {
        console.info("thermometer "+this.device_id+", with temp_current {"+this.temp_current+"} received the following message on topic {"+topic+"}: "+payload)
    }
}

export default MQTTThermometer