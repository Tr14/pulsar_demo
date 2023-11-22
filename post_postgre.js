const { Pool } = require("pg");

const connectDb = async () => {
    try {
        const pool = new Pool({
            user: "pulsar_user",
            host: "localhost",
            database: "pulsar",
            password: "xuantruc",
            port: 5432,
        });

        await pool.connect()
        const res = await pool.query('SELECT * FROM pulsar_demo')
        console.log(res)
        await pool.end()
    } catch (error) {
        console.log(error)
    }
}

connectDb()
