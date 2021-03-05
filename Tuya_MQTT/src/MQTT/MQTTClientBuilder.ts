import { AsyncMqttClient, connectAsync } from "async-mqtt";
import { Packet } from "mqtt-packet";


export abstract class MQTTClientBuilder {
    client: AsyncMqttClient;

    async build(): Promise<MQTTClientBuilder> {
        this.client = await connectAsync("mqtt://test.mosquitto.org");
        this.client.on("message", this.handleMessage.bind(this));
        return this;
    }

    abstract handleMessage(topic: string, payload: Buffer, packet: Packet): void;
}