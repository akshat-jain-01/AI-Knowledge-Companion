import express from 'express'
import axios from 'axios'

const router2 = express.Router()

router2.get('/health', async(req , res) =>{
    try {

        const BaseURL = process.env.AI_SERVICE_BASE_URL

        const response = await axios.get(`${BaseURL}/health`)

        return res.status(200).json({
            source : "ai service",
            data : response.data,
        })

    } catch (error) {
        console.log("AI health check error : ",error.message)

        return res.status(500).json({
            source : "ai service",
            error : "AI server not rechable"
        })
    }
})

export default router2