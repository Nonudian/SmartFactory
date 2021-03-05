import {AsyncMqttClient} from "async-mqtt";
import {Packet} from "mqtt-packet";
const MQTT = require("async-mqtt");

class MQTTDevice {
    public id: string;
    private readonly client: AsyncMqttClient;

    constructor(id: string, client) {
        this.id = id;
        this.client = client;
        this.registerEvents();
    }

    public static async build(id: string): Promise<MQTTDevice> {
        const client = await MQTT.connectAsync("mqtt://test.mosquitto.org")
        return new MQTTDevice(id, client)
    }

    registerEvents() {
        this.client.on('message', this.handleMessage.bind(this))
    }

    handleMessage(topic: string, payload: Buffer, packet: Packet) {
        console.info(this.id + " received the following message on topic {" + topic + "}: " + payload)
    }

    public getClient(): AsyncMqttClient {
        return this.client;
    }
}

export default MQTTDevice