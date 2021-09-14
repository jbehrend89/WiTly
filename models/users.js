import { pool } from '../db.js';

export const createUser = async function (user) {
    try {
        let sql = `INSERT INTO users (username, password) VALUES ($1,$2)`;
        let values = [user.username, user.password];
        let result = await pool.query(sql, values);
        return result;
    } catch (error) {
        console.log(error.stack);
    }
};
