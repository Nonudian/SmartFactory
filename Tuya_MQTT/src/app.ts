import MQTTServer from "./MQTT/MQTTServer";
import MQTTClient from "./MQTT/MQTTClient";

const broker = new MQTTServer();
const fc = new MQTTClient("dk744daa4d4");
fc.connect();
const sc = new MQTTClient("dk74s1sa64a");
sc.connect();