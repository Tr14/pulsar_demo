const Pulsar = require('pulsar-client');

(async () => {
    // Create a client
    const client = new Pulsar.Client({
        serviceUrl: 'pulsar://localhost:6650',
        operationTimeoutSeconds: 30,
    });

    // Create a producer
    const producer = await client.createProducer({
        topic: 'persistent://public/default/my-topic',
        sendTimeoutMs: 30000,
        batchingEnabled: true,
    });

    // Send messages
    for (let i = 0; i < 10; i += 1) {
        const msg = `my-message-${i}`;
        producer.send({
            data: Buffer.from(msg),
        });
        console.log(`Sent message: ${msg}`);
    }
    await producer.flush();

    await producer.close();
    await client.close();
})();