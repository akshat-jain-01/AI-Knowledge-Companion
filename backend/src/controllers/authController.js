import { registerService, loginService } from "../services/authServices.js"

export const registerUser = (req, res) => registerService(req, res)

export const loginUser = (req, res) => loginService(req, res)
