export const chunkText = ({
  text,
  userId,
  fileId,
  fileName,
  chunkSize = 200,
  overlap = 40,
}) => {
  if (!text || typeof text !== "string") {
    throw new Error("Invalid text input for chunking");
  }

  if (overlap >= chunkSize) {
    throw new Error("Overlap must be smaller than chunk size");
  }

  // 🔥 STEP 1: clean text
  const cleanedText = text.replace(/\s+/g, " ").trim();

  // 🔥 STEP 2: sentence split (semantic split)
  const sentences = cleanedText.split(/(?<=[.!?])\s+/);

  const chunks = [];
  let chunkIndex = 0;

  let currentChunk = [];
  let currentLength = 0;

  for (let sentence of sentences) {
    const words = sentence.split(/\s+/);
    const wordCount = words.length;

    // 🔥 if adding sentence exceeds limit → finalize chunk
    if (currentLength + wordCount > chunkSize) {
      const chunkText = currentChunk.join(" ");

      chunks.push({
        user_id: userId,
        file_id: fileId,
        file_name: fileName,
        chunk_index: chunkIndex++,
        text: chunkText,
      });

      // 🔥 overlap logic
      const overlapWords = chunkText.split(" ").slice(-overlap);
      currentChunk = [overlapWords.join(" ")];
      currentLength = overlapWords.length;
    }

    currentChunk.push(sentence);
    currentLength += wordCount;
  }

  // 🔥 last chunk
  if (currentChunk.length > 0) {
    chunks.push({
      user_id: userId,
      file_id: fileId,
      file_name: fileName,
      chunk_index: chunkIndex++,
      text: currentChunk.join(" "),
    });
  }

  return chunks;
};