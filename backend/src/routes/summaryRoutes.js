import express from 'express'
import { summarizeController } from "../controllers/summaryController.js"

const router3 = express.Router()

router3.post('/summarize', summarizeController)

export default router3