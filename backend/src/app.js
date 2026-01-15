import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './routes/test_route.js'
import authRoute from './routes/authRoute.js'
import uploader from './controllers/uploadController.js'
import upload from './config/multer.js'
import multer from 'multer'
import 'dotenv/config'
import router2 from './services/aiServices.js'


const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('combined'))



app.get('/', (req, res) =>{
    res.send('Express app is running')
    console.log("AI SERVICE URL:", process.env.AI_SERVICE_BASE_URL)
})

app.post('/uploader', upload.single("file"), uploader)

app.use('/api/auth', authRoute)
app.use('/api/ai', router2)


app.use((err, req, res, next) =>{

    if(err instanceof multer.MulterError){
        if(err.code === 'LIMIT_FILE_SIZE'){
            return res.status(400).json({
                success: false,
                message: "File too large. Maximum size allowed is 10MB"
            })
        }

        return res.status(400).json({
            success: false,
            message: err.message
        })
    }

    if(err.message === 'Only PDF and DOCX files are allowed'){
            return res.status(400).json({
                success: false,
                message: err.message
            })
        }

    console.log(err.stack)
    res.status(500).json({error : err.message})
})

export default app