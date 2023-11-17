const pulsar = require('pulsar-client');

async function main() {
    try {
        const client = new pulsar.Client({
            serviceUrl: 'pulsar://168.138.203.213:6650',
            operationTimeoutSeconds: 30,
        });

        const producer = await client.createProducer({
            topic: 'persistent://public/default/my-topic',
            sendTimeoutMs: 30000,
            batchingEnabled: true,
        });

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
    } catch (error) {
        console.error('Error:', error);
    }
}

main();