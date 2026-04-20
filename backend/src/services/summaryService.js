import axios from 'axios'

export const summarizeDocument = async({file_id, text, level}) =>{
    const response = await axios.post(
        `${process.env.AI_SERVICE_BASE_URL}/summarize`,
        {
            file_id : file_id,
            text: text,
            level: level
        },
        {timeout: 60000}
    )

    return response.data
}