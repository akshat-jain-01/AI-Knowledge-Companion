export const chunkText = ({
    text,
    userId,
    fileId,
    chunksize = 400,
    overlap = 80,
}) => {
    if (!text || typeof text !== "string") {
        throw new Error("Invalid text input for chunking");
    }

    if (overlap >= chunksize) {
        throw new Error("Overlap must be smaller than chunk size");
    }

    const sentences = text.split(/(?<=[.?!])\s+/);

    const chunks = [];
    let chunkIndex = 0;

    let currentChunk = [];
    let currentLength = 0;

    for (let i = 0; i < sentences.length; i++) {
        const sentence = sentences[i];
        const wordCount = sentence.split(/\s+/).length;

        // agar add karne se chunk size exceed ho raha hai
        if (currentLength + wordCount > chunksize) {
            // push current chunk
            chunks.push({
                user_id: userId,
                file_id: fileId,
                chunk_index: chunkIndex,
                text: currentChunk.join(" "),
            });

            chunkIndex++;

            // 🔥 overlap logic (last N words retain kar)
            const overlapWords = currentChunk.join(" ").split(/\s+/).slice(-overlap);

            currentChunk = [overlapWords.join(" "), sentence];
            currentLength = overlapWords.length + wordCount;
        } else {
            currentChunk.push(sentence);
            currentLength += wordCount;
        }
    }

    // last chunk push
    if (currentChunk.length > 0) {
        chunks.push({
            user_id: userId,
            file_id: fileId,
            chunk_index: chunkIndex,
            text: currentChunk.join(" "),
        });
    }

    return chunks;
};
