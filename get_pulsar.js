const pulsar = require('pulsar-client');

async function consumeMessages() {
    const client = new pulsar.Client({
        serviceUrl: 'pulsar://168.138.203.213:6650',
        operationTimeoutSeconds: 30,
    });

    const consumer = await client.subscribe({
        topic: "my-topic",
        subscription: "subscription",
        subscriptionType: 'Shared',
        ackTimeoutMs: 10000,
    });

    console.log(`Consumer connected to topic: my-topic`);

    for (let i = 0; i < 10; i++) {
        const message = await consumer.receive();
        console.log(`Received message: ${message.getData().toString()}`);

        consumer.acknowledge(message);
    }

    await consumer.close();
    await client.close();
}

consumeMessages().catch(console.error)