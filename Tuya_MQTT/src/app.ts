import { Device } from "./MQTT/Device";
import { Lamp, LampType } from "./MQTT/Lamp";
import { Thermometer, ThermometerType } from "./MQTT/Thermometer";
import { Tuya } from "./MQTT/Tuya";

// device configurations
// report = readonly = get
// issue = write and read = set then get
// params: { attr: value }
// functions: { report|issue: { fct_name: {name_of_attr, number_of_params} }
const deviceConfig = [
    { type: "thermometer", deviceId: "dk744daa4d4", attrs: { temperature: 20 }, functions: { report: { temp_current: { attr: "temperature", params: 0 } }, issue: {} } },
    { type: "thermometer", deviceId: "dk74s1sa64a", attrs: { temperature: 30 }, functions: { report: { temp_current: { attr: "temperature", params: 0 } }, issue: {} } },
    { type: "lamp", deviceId: "dk75s1za38b", attrs: { active: false }, functions: { report: [], issue: { switch_led: { attr: "active", params: 0 } } } },
    { type: "lamp", deviceId: "dk79s1za88c", attrs: { active: true }, functions: { report: [], issue: { switch_led: { attr: "active", params: 0 } } } }
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