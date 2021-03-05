import { ThermometerBuilder } from "./MQTT/ThermometerBuilder";
import { TuyaBuilder } from "./MQTT/TuyaBuilder";


//TODO: make client manager that will take devicesData[x].type in args
const devicesData = [
    { type: "thermometer", deviceId: "dk744daa4d4", params: { tempCurrent: 20 } },
    { type: "thermometer", deviceId: "dk74s1sa64a", params: { tempCurrent: 30 } }
];

new ThermometerBuilder()
    .withDeviceId(devicesData[0].deviceId)
    .withTemperature(devicesData[0].params.tempCurrent)
    .build()
    .then(async thermo => {
        await thermo.client.subscribe(`device.${devicesData[0].type}.${devicesData[0].deviceId}`);
        setInterval(() => thermo.publishToTuya(`bonjour c'est le device ${devicesData[0].deviceId}`), 3000);
    });

new TuyaBuilder()
    .withDevices(devicesData)
    .build()
    .then(async tuya => {
        await tuya.ready();
        await tuya.publishToAllDevices("bonjour c'est tuya");
    });