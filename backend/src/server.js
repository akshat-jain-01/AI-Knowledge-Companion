import express from 'express'
import dotenv from 'dotenv'
import app from './app.js'
import connectDB from './config/db.js'
import router from './routes/test_route.js'

dotenv.config()
connectDB()
app.use('/api/test', router)

const port = process.env.PORT || 5001

app.listen(port, () =>{
    console.log(`App is running on the port ${port}`)
})