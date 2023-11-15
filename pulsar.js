const pulsar = require('pulsar-client');
const topic = 'akadigital';
const subscription = 'demo';
const certificatePath = '/etc/letsencrypt/live/dev.akadigital.net/cert.pem';
const privateKeyPath = '/etc/letsencrypt/live/dev.akadigital.net/privkey.pem';
const serviceUrl = 'pulsar+ssl://dev.akadigital.net:6651;

const client = new pulsar.Client({
    serviceUrl,
    authentication: {
        tls: {
            certificatePath: clientCertificatePath,
            privateKeyPath: clientKeyPath,
        },
    },
});

async function run() {
    
    const producer = await client.createProducer({
        topic,
    });

    await producer.send({
        data: 'Hello, Pulsar!',
    });

    const consumer = await client.subscribe({
        topic,
        subscriptionName: subscription,
        subscriptionType: pulsar.SubscriptionType.Exclusive,
    });

    const message = await consumer.receive();
    console.log(`Received message: ${message.getData().toString()}`);

    await consumer.acknowledge(message);

    await producer.close();
    await consumer.close();
    await client.close();
}

run().catch(console.error);