import dotenv from 'dotenv'
import mysql from 'mysql2'

dotenv.config({ path: '../.env' })

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
    return careerResult
}

const careers = await getCareers()
console.log(careers)