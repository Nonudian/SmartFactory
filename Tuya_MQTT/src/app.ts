import { ThermometerBuilder } from "./MQTT/ThermometerBuilder";
import { TuyaBuilder } from "./MQTT/TuyaBuilder";


//TODO: make client manager that will take devices[x].type in arguments
const devices = [
    { type: "thermometer", deviceId: "dk744daa4d4", params: { tempCurrent: 20 } },
    { type: "thermometer", deviceId: "dk74s1sa64a", params: { tempCurrent: 30 } }
];

new ThermometerBuilder()
    .withDeviceId(devices[0].deviceId)
    .withTemperature(devices[0].params.tempCurrent)
    .build();

new ThermometerBuilder()
    .withDeviceId(devices[1].deviceId)
    .withTemperature(devices[1].params.tempCurrent)
    .build();

new TuyaBuilder()
    .withDevices(devices)
    .build();