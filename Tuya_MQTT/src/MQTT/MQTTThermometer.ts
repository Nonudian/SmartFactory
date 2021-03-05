import MQTTDevice from "./MQTTDevice";
import {AsyncMqttClient} from "async-mqtt";
import {Packet} from "mqtt-packet";
const MQTT = require("async-mqtt");

class MQTTThermometer extends MQTTDevice {
    public temp_current: number;

    constructor(id: string, client: AsyncMqttClient, temp_current: number) {
        super(id, client);
        this.temp_current = temp_current;
    }

    public static async build(id: string, temp_current: number): Promise<MQTTThermometer> {
        const client = await MQTT.connectAsync("mqtt://test.mosquitto.org")
        return new MQTTThermometer(id, client, temp_current)
    }

    handleMessage(topic: string, payload: Buffer, packet: Packet) {
        console.info("thermometer "+this.id+", with temp_current {"+this.temp_current+"} received the following message on topic {"+topic+"}: "+payload)
    }
}

export default MQTTThermometer