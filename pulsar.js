const pulsar = require('pulsar-client');

async function main() {
    try {
        const client = new pulsar.Client({
            //serviceUrl: 'pulsar://168.138.203.213:6650', //-> server anh Cường
            serviceUrl: 'pulsar://172.22.79.221:6650',
            operationTimeoutSeconds: 30,
        });

        const producer = await client.createProducer({
            topic: 'persistent://public/default/my-topic',
            sendTimeoutMs: 30000,
            batchingEnabled: true,
        });

        const message = '{ "customer": "John Doe", "items": {"product": "Beer","qty": 6}}';
        producer.send({
            data: Buffer.from(message),
        });
        console.log(`Sent message: ${message}`);

        await producer.flush();

        await producer.close();
        await client.close();
    } catch (error) {
        console.error('Error:', error);
    }
}

main();