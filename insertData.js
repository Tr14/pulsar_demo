const { pool } = require("./db");

async function insertData() {
    const [message] = process.argv.slice(1);
    try {
        const res = await pool.query(
            "INSERT INTO pulsardata (message) VALUES ($1)", [message]
        );
        console.log(`Pass message to pulsar ${message}`);
    } catch (error) {
        console.error(error)
    }
}

insertData();