const { pool } = require("./db");

async function getData() {
    try {
        const res = await pool.query("SELECT * FROM pulsardata");
        console.log(res.rows);
    } catch (error) {
        console.error(error);
    }
}

getData()