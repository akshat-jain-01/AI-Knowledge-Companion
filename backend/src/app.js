import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import router from './routes/test_route.js'
import authRoute from './routes/authRoute.js'

const app = express()

app.use(cors())
app.use(express.json())
app.use(morgan('combined'))



app.get('/', (req, res) =>{
    res.send('Express app is running')
})

app.use('/api/auth', authRoute)

app.use((err, req, res, next) =>{
    console.log(err.stack)
    res.status(500).json({error : err.message})
})

export default app