const { pool } = require("./db");

async function getData() {
    try {
        const res = await pool.query("SELECT * FROM pulsardata WHERE message_name = 'truc test json'");
        console.log(res.rows);
    } catch (error) {
        console.error(error);
    }
}

getData()