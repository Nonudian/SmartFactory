import BuildableMQTTClient from "./BuildableMQTTClient";
import {Packet} from "mqtt-packet";

class Tuya extends BuildableMQTTClient {
    handleMessage(topic: string, payload: Buffer, packet: Packet) {
        console.info("tuya");
    }

}
export default Tuya