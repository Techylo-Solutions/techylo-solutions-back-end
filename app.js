import express from 'express'
import multer from 'multer'
import cors from 'cors'
import { createApplication, getCareers } from './src/database.js'

const app = express()
const upload = multer({
    destination: function(req, file, cb){
        return cb(null, "/uploads")
    }
})
app.use(cors())
const port = 8080

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
      
      /*
      res.json({ message: 'Application submitted successfully' });
      console.log('Form Data: ', { career, fname, lname, email, cv});
      console.log('CV: ', cv);
      */

      await createApplication(fname, lname, email, cvFileName, career)
    } 
    catch (error) {
      console.error(error);
    }
});

app.listen(port, () => {
    console.log(`Express is running in port ${port}`)
})
