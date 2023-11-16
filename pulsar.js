const pulsar = require('pulsar-client');
const certificatePathLetsencrypt = '/etc/letsencrypt/live/dev.akadigital.net/cert.pem';
const privateKeyPathLetsencrypt = '/etc/letsencrypt/live/dev.akadigital.net/privkey.pem';

async function run() {
    const client = new pulsar.Client({
        serviceUrl: 'pulsar://localhost:6650',
        /*
        authentication: {
            tls: {
                certificatePath: certificatePathLetsencrypt,
                privateKeyPath: privateKeyPathLetsencrypt,
            },
        },
        */
        logLevel: 'VERBOSE',
    });

    const producer = await client.createProducer({
        topic: 'persistent://public/default/akadigital',
    });

    const consumer = await client.subscribe({
        topic: 'persistent://public/default/my-topic',
        subscription: 'sub1',
        subscriptionType: pulsar.SubscriptionType.Exclusive,
    });

    producer.send({
        data: Buffer.from("hello")
    });

    const message = await consumer.receive();
    console.log(`Received message: ${message.getData().toString()}`);
    consumer.acknowledge(message);

    await producer.close();
    await consumer.close();
    await client.close();
}

run().catch(console.error);