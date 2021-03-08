import { AsyncMqttClient, connectAsync } from "async-mqtt";


/** MQTT client */
export abstract class MQTTClient {
    private client: AsyncMqttClient;

    protected async build() {
        this.client = await connectAsync("mqtt://test.mosquitto.org");
        this.client.on("message", this.handleMessage.bind(this));
        return this;
    }

    protected async subscribe(topic: string) {
        await this.client.subscribe(topic);
    }

    protected async publish(topic: string, message: string) {
        await this.client.publish(topic, message);
    }

    protected abstract handleMessage(topic: string, payload: Buffer): void;
}