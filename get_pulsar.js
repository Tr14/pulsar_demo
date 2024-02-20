const pulsar = require('pulsar-client');
const { pool } = require("./db");

async function consumeMessages() {
    const client = new pulsar.Client({
        //serviceUrl: 'pulsar://168.138.203.213:6650', //-> server anh Cường
        serviceUrl: 'pulsar://172.22.79.221:6650',
        operationTimeoutSeconds: 30,
    });

    const consumer = await client.subscribe({
        topic: "my-topic",
        subscription: "subscription",
        subscriptionType: 'Shared',
        ackTimeoutMs: 10000,
    });

    console.log(`Consumer connected to topic: my-topic`);

    const message = await consumer.receive();
    console.log(`Received message: ${message.getData().toString()}`);

    try {
        const res = await pool.query(
            "INSERT INTO pulsardata (message_name, message_data) VALUES ($1, $2)", ["truc test json", message.getData().toString()]
        );
        console.log(`Pass ${message.getData().toString()} from pulsar to postgres`);
    } catch (error) {
        console.error(error)
    }

    consumer.acknowledge(message);

    await consumer.close();
    await client.close();
}

consumeMessages().catch(console.error)