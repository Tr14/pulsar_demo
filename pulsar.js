const pulsar = require('pulsar-client');
const topic = 'akadigital';
const subscription = 'demo';

async function run() {
	/*
    const auth = new pulsar.AuthenticationTls({
        certificatePath: '/etc/letsencrypt/live/dev.akadigital.net/cert.pem',
        privateKeyPath: '/etc/letsencrypt/live/dev.akadigital.net/privkey.pem',
    });

    const client = new pulsar.Client({
        serviceUrl: 'pulsar+ssl://dev.akadigital.net:1337/',
        authentication: auth,
        tlsTrustCertsFilePath: '/etc/letsencrypt/live/dev.akadigital.net/fullchain.pem',
    });
	*/
    const client = new pulsar.Client({
        serviceUrl: 'pulsar://localhost:1337'
    });

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