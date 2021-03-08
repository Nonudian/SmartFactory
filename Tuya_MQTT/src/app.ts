import { Thermometer } from "./MQTT/Thermometer";
import { Tuya } from "./MQTT/Tuya";


// device configuration
const deviceConfig = [
    { type: "thermometer", deviceId: "dk744daa4d4", params: { temperature: 20 } },
    { type: "thermometer", deviceId: "dk74s1sa64a", params: { temperature: 30 } },
    { type: "lamp", deviceId: "dk74s1sa64b", params: { mdr: 20 } }
];

function getDevices() {
    return deviceConfig.map(config => {
        switch (config.type) {
            case "thermometer": return new Thermometer(config).build();
            default: throw new Error(`<${config.type}> is not a recognized device.`);;
        }
    });
}

Promise.all(getDevices()).then(devices => new Tuya(devices).build());