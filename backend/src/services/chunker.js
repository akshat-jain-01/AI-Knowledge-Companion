// export const chunkText = ({
//   text,
//   userId,
//   fileId,
//   fileName,
//   chunkSize = 200,
//   overlap = 40,
// }) => {
//   if (!text || typeof text !== "string") {
//     throw new Error("Invalid text input for chunking");
//   }

//   if (overlap >= chunkSize) {
//     throw new Error("Overlap must be smaller than chunk size");
//   }

//   // STEP 1: clean text
//   const cleanedText = text.replace(/\s+/g, " ").trim();

//   // // STEP 2: sentence split (semantic split)
//   // const sentences = cleanedText.split(/(?<=[.!?])\s+/);

//   // const chunks = [];
//   // let chunkIndex = 0;

//   // let currentChunk = [];
//   // let currentLength = 0;

//   // for (let sentence of sentences) {
//   //   const words = sentence.split(/\s+/);
//   //   const wordCount = words.length;





//   // STEP 2: paragraph + sentence split
// const paragraphs = cleanedText
//   .split(/\n+/)
//   .map(p => p.trim())
//   .filter(p => p.length > 0);

// let sentences = [];

// for (let para of paragraphs) {
//   // try sentence split
//   const paraSentences = para.split(/(?<=[.!?])\s+/);

//   //  fallback: if no punctuation → treat whole para as one unit
//   if (paraSentences.length === 1) {
//     sentences.push(para);
//   } else {
//     sentences.push(...paraSentences);
//   }
// }





//     //  if adding sentence exceeds limit → finalize chunk
//     if (currentLength + wordCount > chunkSize) {
//       const chunkText = currentChunk.join(" ");

//       chunks.push({
//         user_id: userId,
//         file_id: fileId,
//         file_name: fileName,
//         chunk_index: chunkIndex++,
//         text: chunkText,
//       });

//       // overlap logic
//       const overlapWords = chunkText.split(" ").slice(-overlap);
//       currentChunk = [overlapWords.join(" ")];
//       currentLength = overlapWords.length;
//     }

//     currentChunk.push(sentence);
//     currentLength += wordCount;
//   }

//   // last chunk
//   if (currentChunk.length > 0) {
//     chunks.push({
//       user_id: userId,
//       file_id: fileId,
//       file_name: fileName,
//       chunk_index: chunkIndex++,
//       text: currentChunk.join(" "),
//     });
//   }

//   return chunks;
// };






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

  // STEP 1: clean text (but keep newlines!)
  const cleanedText = text
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .trim();

  // STEP 2: paragraph split (VERY IMPORTANT for PDFs/resumes)
  const paragraphs = cleanedText
    .split(/\n+/)
    .map((p) => p.trim())
    .filter((p) => p.length > 0);

  let sentences = [];

  //  STEP 3: hybrid split
  for (let para of paragraphs) {
    const paraSentences = para.split(/(?<=[.!?])\s+/);

    // fallback for structured text (like resumes)
    if (paraSentences.length === 1) {
      sentences.push(para);
    } else {
      sentences.push(...paraSentences);
    }
  }

  const chunks = [];
  let chunkIndex = 0;

  let currentChunk = [];
  let currentLength = 0;

  // STEP 4: build chunks
  for (let sentence of sentences) {
    const words = sentence.split(/\s+/);
    const wordCount = words.length;

    // if exceeds → finalize chunk
    if (currentLength + wordCount > chunkSize) {
      const chunkText = currentChunk.join(" ").trim();

      // skip tiny chunks (noise removal)
      if (chunkText.length > 20) {
        chunks.push({
          user_id: userId,
          file_id: fileId,
          file_name: fileName,
          chunk_index: chunkIndex++,
          text: chunkText,
        });
      }

      // overlap logic
      const overlapWords = chunkText.split(" ").slice(-overlap);
      currentChunk = [overlapWords.join(" ")];
      currentLength = overlapWords.length;
    }

    currentChunk.push(sentence);
    currentLength += wordCount;
  }

  // STEP 5: last chunk
  if (currentChunk.length > 0) {
    const chunkText = currentChunk.join(" ").trim();

    if (chunkText.length > 20) {
      chunks.push({
        user_id: userId,
        file_id: fileId,
        file_name: fileName,
        chunk_index: chunkIndex++,
        text: chunkText,
      });
    }
  }

  return chunks;
};