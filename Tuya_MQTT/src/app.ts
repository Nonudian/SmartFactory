import Tuya from "./MQTT/Tuya"

function main() {
    const devices_data = [
        {type: "thermometer", device_id: "dk744daa4d4", params: {temp_current: 20}},
        {type: "thermometer", device_id: "dk74s1sa64a", params: {temp_current: 30}}
    ]

    Tuya.build(devices_data).then(async t => {
        await t.ready()
        await t.publishToAllDevices("bonjour c'est tuya")
    });
}

main()