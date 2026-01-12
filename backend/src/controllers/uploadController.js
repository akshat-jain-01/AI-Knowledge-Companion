import { response } from "express"
import upload from "../config/multer"

const uploader = (req, res) =>{
    try {
        if(!req.file){
            return res.status(400).json({
                success: false,
                message : "No file uploaded. Please upload a PDF or DOCX file"
            })
        }

        return res.status(200).json({
            success : true,
            message : "File uploaded successfully",
            file: {
                originalname : req.file.originalname,
                storedname : req.file.storedname,
                size : req.file.size,
                path : req.file.path
            }
        })

    } catch (error) {
        console.error("Upload error", error)
        return res.status(500).json({
            success : false,
            message : "server error during file upload"
        })
    }
}

export default uploader