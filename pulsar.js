const Pulsar = require('pulsar-client');

(async () => {
    const client = new Pulsar.Client({
        serviceUrl: 'pulsar+ssl://localhost:6651',
        authentication: {
            use: 'tls',
            trustedCertificates: ['/home/trucnguyen/apache-pulsar-3.1.1/cert/ca-cert.pem'],
            certificatePath: '/home/trucnguyen/apache-pulsar-3.1.1/cert/pulsar-admin-cert.pem',
            privateKeyPath: '/home/trucnguyen/apache-pulsar-3.1.1/cert/pulsar-admin.pem',
        },
    });

    const producer = await client.createProducer({
        topic: 'my-topic',
    });

    const message = {
        data: 'Hello, Pulsar!',
    };

    await producer.send(message);

    await producer.close();
    await client.close();
})();