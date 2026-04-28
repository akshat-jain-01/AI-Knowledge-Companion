import express from "express";
import { getDocuments } from "../controllers/documentController.js";
import { authMiddleware } from "../middleware/auth.js";

const routers = express.Router();

routers.get("/documents", authMiddleware, getDocuments);

export default routers;