import express from "express"
import askController from "../controllers/askController.js"
import { authMiddleware } from '../middleware/auth.js'

const router = express.Router()

router.post("/ask",authMiddleware, askController)

export default router
