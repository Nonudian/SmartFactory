import MQTTClient from "./MQTT/MQTTClient";

async function main() {
    const fc = await MQTTClient.build("dk744daa4d4");
    const sc = await MQTTClient.build("dk74s1sa64a");
}

main()