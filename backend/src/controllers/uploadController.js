import { response } from "express"
import upload from "../config/multer.js"
import { extractTextFromFile } from "../services/TextExtractor.js"
import axios from "axios"
import { chunkText } from "../services/chunker.js"

const uploader = async(req, res) =>{
    try {
        if(!req.file){
            return res.status(400).json({
                success: false,
                message : "No file uploaded. Please upload a PDF or DOCX file"
            })
        }

        const text = await extractTextFromFile(req.file)

        if(!text || text.trim().length === 0){
            return res.status(400).json({
                success : false,
                message : "unable to extract data from file"
            })
        }

        console.log("Extracted text length ", text.length)

        const chunks = chunkText({
            text : text,
            userId : req.user?.id || "temp_user",
            fileId : req.file.filename
        })

        console.log("Total chunks:", chunks.length)
        console.log("Sample chunk:", chunks[0])

        const payload = {
            user_id : req.user?.id || "temp_user",
            file_id : req.file.filename,
            text : text
        }

        const airesponse = await axios.post(
            `${process.env.AI_SERVICE_BASE_URL}/ingest`,
            payload,
            {timeout : 10000}
        )

        if(airesponse.data.status !== "success"){
            return res.status(500).json({
                success : false,
                message : "AI ingestion failed"
            })
        }

        return res.status(200).json({
            success : true,
            message : "File uploaded, extracted and ingested successfully",
            file: {
                originalname : req.file.originalname,
                storedname : req.file.filename,
                size : req.file.size,
                path : req.file.path
            }
        })

    } catch (error) {
        console.error("Upload/AI error", error)
        return res.status(500).json({
            success : false,
            message : "server error during file upload or AI processing"
        })
    }
}

export default uploader