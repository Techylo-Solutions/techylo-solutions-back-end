import express from 'express'
import cors from 'cors'
import { getCareers } from './src/database.js'

const app = express()
app.use(cors())
const port = 8080

app.get('/careers', async (req, res) => {
    try{
        const careers = await getCareers()
        /*console.log(careers)*/
        return res.json(careers)
        
    }
    catch(error){
        console.error(error)
        res.status(500).json({error: 'Internal server error'})
    }
});

/*app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})
*/

app.listen(port, () => {
    console.log(`Express is running in port ${port}`)
})