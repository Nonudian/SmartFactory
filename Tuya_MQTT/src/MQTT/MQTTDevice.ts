import {AsyncMqttClient} from "async-mqtt";
import {Packet} from "mqtt-packet";

abstract class MQTTDevice {
    protected readonly device_id: string;
    public readonly client: AsyncMqttClient;

    protected constructor(device_id: string, client: AsyncMqttClient) {
        this.device_id = device_id;
        this.client = client;
        this.registerEvents();
    }

    registerEvents() {
        this.client.on('message', this.handleMessage.bind(this))
    }

    abstract handleMessage(topic: string, payload: Buffer, packet: Packet);
}

export default MQTTDevice