import mysql from 'mysql2'

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'techylosolutions123!',
    database: 'techylo_solutions'
}).promise()

const result = await pool.query()
