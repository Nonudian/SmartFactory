import {AsyncMqttClient} from "async-mqtt";
import {Packet} from "mqtt-packet";

abstract class MQTTDevice {
    public readonly id: string;
    public readonly client: AsyncMqttClient;

    protected constructor(id: string, client: AsyncMqttClient) {
        this.id = id;
        this.client = client;
        this.registerEvents();
    }

    registerEvents() {
        this.client.on('message', this.handleMessage.bind(this))
    }

    abstract handleMessage(topic: string, payload: Buffer, packet: Packet);
}

export default MQTTDevice