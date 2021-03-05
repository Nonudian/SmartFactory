const mqtt = require('mqtt')

class MQTTClient {
    public id: string;
    public client;

    constructor(id: string, client) {
        client.on('connect', function () {
            client.subscribe('presence', function (err) {
                if (!err) {
                    client.publish('presence', 'Hello mqtt')
                }
            })
        })

        client.on('message', function (topic, message) {
            console.log(message.toString())
            client.end()
        })

        client.on('error', function () {
            console.log("ERROR")
            client.end()
        })

        this.id = id
        this.client = client
    }

    public static async build(id: string): Promise<MQTTClient> {
        const client = await mqtt.connect('mqtt://test.mosquitto.org')
        return new MQTTClient(id, client)
    }
}

export default MQTTClient