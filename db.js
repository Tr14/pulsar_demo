const { Pool } = require('pg')

const pool = new Pool({
    user: 'tructest',
    database: 'pulsar',
    password: 'xuantruc',
    port: 5432,
    host: 'localhost',
})

module.exports = { pool };