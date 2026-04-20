import { summarizeDocument } from "../services/summaryService.js";
import ChunkModel from "../models/chunk.model.js";

export const summarizeController = async(req, res)=>{
    try {
        const{fileId, level} = req.body
        if(!fileId){
            return res.status(400).json({
                success : false,
                message : "File ID is required"
            })
        }

        // Fetch all chunks for this file from MongoDB
        const chunks = await ChunkModel.find({ file_id: fileId });

        if (!chunks || chunks.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No content found for this file"
            });
        }

        // Combine all chunk texts and limit length for summarization
        const fullText = chunks
            .sort((a, b) => a.chunk_index - b.chunk_index) // Sort by chunk index
            .map(chunk => chunk.text)
            .join(" ");

        // Limit text length to avoid LLM token limits (approximately 2000 characters for safety)
        const maxLength = 2000;
        const truncatedText = fullText.length > maxLength
            ? fullText.substring(0, maxLength) + "..."
            : fullText;

        const result = await summarizeDocument({
            file_id: fileId,
            text: truncatedText,
            level : level || "short"
        })

        return res.status(200).json({
            success: true,
            summary: result.summary,
            level: result.level
        })
    }
    catch (error) {
        console.error("Summarization error:", error.message)
        return res.status(500).json({
            success: false,
            message: "Failed to generate summary"
        })
    }
}