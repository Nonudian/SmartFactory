const net = require('net')
import * as Connection from "mqtt-connection"

class MQTTClient {
    public client: Connection;
    public id: string;

    constructor(id: string) {
        this.id = id;
        this.client = Connection(net.createConnection(1883, 'localhost'))
    }

    connect() {
        this.client.connect({clientId: this.id});
    }
}

export default MQTTClient;