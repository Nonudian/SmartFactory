import {AsyncMqttClient} from "async-mqtt"
import BuildableMQTTClient from "./BuildableMQTTClient"

abstract class Device extends BuildableMQTTClient {
    protected readonly device_id: string

    protected constructor(client: AsyncMqttClient, device_id: string) {
        super(client)
        this.device_id = device_id
        setInterval(() => this.publishToTuya("bonjour c'est le device " + device_id), 3000)
    }

    public async publishToTuya(message: string) {
        await this.client.publish("tuya", message)
    }
}

export default Device