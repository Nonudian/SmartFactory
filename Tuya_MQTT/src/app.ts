import Thermometer from "./MQTT/Thermometer";
import Tuya from "./MQTT/Tuya";

async function main() {
    const tuya = await Tuya.build();
    const fc = await Thermometer.build("dk744daa4d4", 20);
    const sc = await Thermometer.build("dk74s1sa64a", 30);
    await fc.client.subscribe("do/stuff");
    await sc.client.subscribe("do/stuff");
    await sc.client.publish("do/stuff", "bjr");
}

main()