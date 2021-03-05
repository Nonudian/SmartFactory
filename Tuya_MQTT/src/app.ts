import MQTTDevice from "./MQTT/MQTTDevice";

async function main() {
    const fc = await MQTTDevice.build("dk744daa4d4");
    const sc = await MQTTDevice.build("dk74s1sa64a");
    await fc.getClient().subscribe("do/stuff");
    await sc.getClient().subscribe("do/stuff");
    await sc.getClient().publish("do/stuff", "bjr");
}

main()