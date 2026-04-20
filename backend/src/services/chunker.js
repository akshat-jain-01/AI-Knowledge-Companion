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

  const paragraphs = text.split(/\n+/).filter((p) => p.trim() !== "");

  const chunks = [];
  let chunkIndex = 0;

  let currentChunk = "";
  let currentLength = 0;

  for (let para of paragraphs) {
    const wordCount = para.split(/\s+/).length;

    if (currentLength + wordCount > chunksize) {
      chunks.push({
        user_id: userId,
        file_id: fileId,
        chunk_index: chunkIndex,
        text: currentChunk.trim(),
      });

      chunkIndex++;

      currentChunk = para;
      currentLength = wordCount;
    } else {
      currentChunk += " " + para;
      currentLength += wordCount;
    }
  }

  if (currentChunk) {
    chunks.push({
      user_id: userId,
      file_id: fileId,
      chunk_index: chunkIndex,
      text: currentChunk.trim(),
    });
  }

  return chunks;
};
