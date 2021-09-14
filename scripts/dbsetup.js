import { pool } from '../db.js';

let sql = `
CREATE TABLE IF NOT EXISTS users (
id SERIAL PRIMARY KEY,
username VARCHAR(100) NOT NULL,
password TEXT NOT NULL
);`;

pool.query(sql, (err, res) => {
    console.log(err, res);
});

pool.end();