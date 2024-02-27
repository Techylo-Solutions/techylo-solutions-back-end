// src/database.js
import mysql from 'mysql2'
import dotenv from 'dotenv'

dotenv.config()

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

export async function getCareers(){
    const [careerResult] = await pool.query(
        "SELECT * FROM Careers"    
    )
    return careerResult;
}

async function createApplication(){
    
}