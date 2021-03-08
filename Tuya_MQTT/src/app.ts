import { Device } from "./MQTT/Device";
import { Lamp, LampType } from "./MQTT/Lamp";
import { Thermometer, ThermometerType } from "./MQTT/Thermometer";
import { Tuya } from "./MQTT/Tuya";


// device configurations
const deviceConfig = [
    { type: "thermometer", deviceId: "dk744daa4d4", params: { temperature: 20 } },
    { type: "thermometer", deviceId: "dk74s1sa64a", params: { temperature: 30 } },
    { type: "lamp", deviceId: "dk75s1za38b", params: { switchLed: false } },
    { type: "lamp", deviceId: "dk79s1za88c", params: { switchLed: true } }
];

// build devices
function getDevices(): Promise<Device>[] {
    return deviceConfig.map(config => {
        switch (config.type) {
            case "thermometer": return new Thermometer(<ThermometerType>config).build();
            case "lamp": return new Lamp(<LampType>config).build();
            default: throw new Error(`<${config.type}> is not a recognized device.`);
        }
    });
}

// link devices with Tuya client
Promise.all(getDevices()).then(devices => new Tuya(devices).build());