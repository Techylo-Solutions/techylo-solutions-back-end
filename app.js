import express from 'express'
import multer from 'multer'
import cors from 'cors'
import { createApplication, getCareers } from './src/database.js'
import { createMessage } from './src/database.js'
import bodyParser from 'body-parser'

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const upload = multer({
    dest:'uploads/',
    fileFilter: (req, file, cb) => {
        if(file.mimetype === 'application/pdf'){
            cb(null, true);
        }
        else{
            cb(new Error('PDF'))
        }
    }
})
app.use(cors())
const port = 8084

app.get('/careers', async (req, res) => {
    try{
        const careers = await getCareers()
        return res.json(careers)
    }
    catch(error){
        console.error(error)
        res.status(500).json({error: 'Internal server error'})
    }
})


app.post('/sendApplication', upload.single('file'), async (req, res) => {
    try {

      const { fname, lname, email, career } = req.body;
      const cvFileName = req.file.originalname;
      
      await createApplication(fname, lname, email, cvFileName, career)

      res.status(200).json({ message: 'Application submitted successfully' });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to submit the application try again.' });
    }
});


app.post('/sendMessage', async (req, res) => {
    try {

      const { fname, lname, email, message } = req.body;  
      await createMessage(fname, lname, email, message)
        
      res.status(200).json({ message: 'Message sent succesfully.' });
    } 
    catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to send the message. Try again.' });
    }
});


app.listen(port, () => {
    console.log(`Express is running in port ${port}`)
})
