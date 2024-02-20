const { Pool } = require('pg')

const pool = new Pool({
    user: 'pulsaruser',
    database: 'pulsardata',
    password: 'xuantruc1234',
    port: 5432,
    host: 'localhost',
})

module.exports = { pool };