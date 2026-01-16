
export const chunkText = ({
    text,
    userId,
    fileId,
    chunksize = 400,
    overlap = 80
}) => {
    if(!text || typeof text !== "string"){
        throw new Error("Invalid text input for chunking")
    }

    const word = text.split(/\s+/)
    const chunk = []

    let start = 0
    let chunkIndex = 0
    const step = chunksize - overlap

    while(start < word.length){
        const end = start + chunksize
        const chunkwords = word.slice(start, end)
        const chunkText = chunkwords.join(" ")

        chunk.push({
            user_id : userId,
            file_id : fileId,
            chunk_index : chunkIndex,
            text : chunkText
        })

        start += step
        chunkIndex++
    }

    return chunk
}