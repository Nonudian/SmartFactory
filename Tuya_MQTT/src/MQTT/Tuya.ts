import BuildableMQTTClient from "./BuildableMQTTClient"
import {Packet} from "mqtt-packet"
import {AsyncMqttClient} from "async-mqtt"
import Thermometer from "./Thermometer"
const MQTT = require("async-mqtt")

class Tuya extends BuildableMQTTClient {
    private readonly devices_data: Object[]

    constructor(client: AsyncMqttClient, devices_data: Object[]) {
        super(client)
        this.devices_data = devices_data;
    }

    public static async build(devices_data: Object[]): Promise<Tuya> {
        const client = await MQTT.connectAsync("mqtt://test.mosquitto.org")
        const devices = [];
        for(let device_data of devices_data) {
            switch(device_data["type"]) {
                case "thermometer":
                default:
                    let device = await Thermometer.build(device_data["device_id"], device_data["params"]["temp_current"])
                    await device.client.subscribe("device."+device_data["type"]+"."+device_data["device_id"])
                    devices.push(device)
            }
        }
        return new Tuya(client, devices_data)
    }

    public async ready() {
        await this.client.subscribe("tuya")
    }

    public async publishToAllDevices(message: string) {
        for(let device_data of this.devices_data) {
            await this.publishToOneDevice(device_data["type"], device_data["device_id"], message)
        }
    }

    public async publishToOneDevice(device_type: string, device_id: string, message: string) {
        await this.client.publish("device."+device_type+"."+device_id, message)
    }

    handleMessage(topic: string, payload: Buffer, packet: Packet): void {
        console.info("tuya received the following message on topic {"+topic+"}: "+payload)
    }
}
export default Tuya