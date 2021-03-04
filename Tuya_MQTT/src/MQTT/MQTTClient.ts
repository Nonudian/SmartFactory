const mqtt = require('mqtt')

class MQTTClient {
    public id: string;

    constructor(id: string) {
        this.id = id;
        const client = mqtt.connect('mqtt://test.mosquitto.org')

        client.on('connect', function () {
            client.subscribe('presence', function (err) {
                if (!err) {
                    client.publish('presence', 'Hello mqtt')
                }
            })
        })

        client.on('message', function (topic, message) {
            // message is Buffer
            console.log(message.toString())
            client.end()
        })
    }
}

export default MQTTClient;