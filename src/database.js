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


export async function createApplication(fname, lname, email, cvFileName, career){
    try{
        await pool.query(
            `
            INSERT INTO applicants (first_name, last_name, email, cv_file_name, job_id)
            VALUES (?,?,?,?,?);
            `,
            [fname, lname, email, cvFileName, career] 
        )
    }

    catch(error){
        throw error;
    }
    
}