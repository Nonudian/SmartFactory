import MQTTThermometer from "./MQTT/MQTTThermometer";

async function main() {
    const fc = await MQTTThermometer.build("dk744daa4d4", 20);
    const sc = await MQTTThermometer.build("dk74s1sa64a", 30);
    await fc.client.subscribe("do/stuff");
    await sc.client.subscribe("do/stuff");
    await sc.client.publish("do/stuff", "bjr");
}

main()