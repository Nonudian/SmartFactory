import {AsyncMqttClient} from "async-mqtt";
import {Packet} from "mqtt-packet";

abstract class BuildableMQTTClient {
    public readonly client: AsyncMqttClient;

    protected constructor(client: AsyncMqttClient) {
        this.client = client;
        this.registerEvents();
    }

    registerEvents() {
        this.client.on('message', this.handleMessage.bind(this))
    }

    public static async build(...args: any[]): Promise<BuildableMQTTClient> {
        return Promise.reject("`public static async build` Not implemented.");
    };

    abstract handleMessage(topic: string, payload: Buffer, packet: Packet);
}
export default BuildableMQTTClient