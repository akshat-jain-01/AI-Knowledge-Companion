import mongoose from 'mongoose'

const connectDB = async() =>{
    mongoose.connection.on('connected', ()=>{
        console.log('Database connected')
    })

    mongoose.connection.on('error', (err)=>{
        console.log('Connection error', err)
    })

    await mongoose.connect(`${process.env.MONGO_URI}`)
}

export default connectDB