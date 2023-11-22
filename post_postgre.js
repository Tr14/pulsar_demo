const { Client } = require('pg');

const client = new Client({
    user: 'pulsar_user',
    host: 'localhost',
    database: 'pulsar',
    password: 'xuantruc',
    port: 5432,
});

client.connect();

client.query('SELECT * FROM pulsar_demo', (err, res) => {
    if (err) {
        console.error(err);
    } else {
        console.log(res.rows);
    }
    client.end();
});