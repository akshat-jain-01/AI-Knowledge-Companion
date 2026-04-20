// import axios from "axios"
// import ChunkModel from "../models/chunk.model"

// const askController = async (req, res) => {
//   try {
//     const { question, top_k = 3 } = req.body

//     // 1️⃣ Validation
//     if (!question || !question.trim()) {
//       return res.status(400).json({
//         success: false,
//         message: "Question is empty"
//       })
//     }

//     // 2️⃣ AI → /search (FAISS retrieval)
//     const searchResponse = await axios.post(
//       `${process.env.AI_SERVICE_BASE_URL}/search`,
//       {
//         query: question,
//         top_k: top_k
//       },
//       { timeout: 10000 }
//     )

//     const chunks = searchResponse.data.results

//     // 3️⃣ Agar kuch mila hi nahi
//     if (!chunks || chunks.length === 0) {
//       return res.status(200).json({
//         success: true,
//         answer: "I don't know",
//         sources: []
//       })
//     }

//     // 4️⃣ AI → /ask (LLM answer generation)
//     const answerResponse = await axios.post(
//       `${process.env.AI_SERVICE_BASE_URL}/ask`,
//       {
//         question: question,
//         chunks: chunks
//       },
//       { timeout: 20000 }
//     )

//     // 5️⃣ Final response to client
//     return res.status(200).json({
//       success: true,
//       answer: answerResponse.data.answer,
//       sources: chunks.map(c => c.chunk_index)
//     })

//   } catch (error) {
//     console.error("Ask Controller Error:", error.message)

//     return res.status(500).json({
//       success: false,
//       message: "Failed to generate answer"
//     })
//   }
// }

// export default askController


import axios from "axios"
import ChunkModel from "../models/chunk.model.js"



const askController = async (req, res) => {
  try {
    const { question, top_k = 3, user_id } = req.body

    // 1️⃣ Validation
    if (!question || !question.trim()) {
      return res.status(400).json({
        success: false,
        message: "Question is empty"
      })
    }


    if (!user_id || !user_id.trim()) {
      return res.status(400).json({
        success: false,
        message: "User ID is empty"
      })
    }

    // 2️⃣ FAISS search
    const searchResponse = await axios.post(
      `${process.env.AI_SERVICE_BASE_URL}/search`,
      { query: question, top_k },
      { timeout: 30000 }
    )

    const matches = searchResponse.data.results || []

    // 🔥 FIX 1: early return
    if (matches.length === 0) {
      return res.status(200).json({
        success: true,
        answer: "I don't know",
        sources: []
      })
    }

    console.log("MATCHES:", matches)

    // 3️⃣ MongoDB fetch
    const dbChunks = await ChunkModel.find({
      $or: matches.map(m => ({
        file_id: m.file_id,
        chunk_index: m.chunk_index
      }))
    })

    console.log("DB CHUNKS:", dbChunks.map(c => c.text))

    // 🔥 FIX 2: order maintain kar
    const orderedChunks = matches.map(m =>
      dbChunks.find(
        d =>
          d.file_id.toString() === m.file_id.toString() &&
          d.chunk_index === m.chunk_index
      )
    ).filter(Boolean)

    // 4️⃣ Context build
    //const MAX_CHARS = 2000  // 🔥 limit

    let context = ""

    for (let i = 0; i < orderedChunks.length; i++) {
      const chunkText = `--- Chunk ${i} ---\n${orderedChunks[i].text}\n\n`

      //if ((context + chunkText).length > MAX_CHARS) break

      context += chunkText
    }

    console.log("CONTEXT:", context)
    

    // 5️⃣ LLM call
    const answerResponse = await axios.post(
      `${process.env.AI_SERVICE_BASE_URL}/ask`,
      {
        question,
        context, 
        user_id
      },
      { timeout: 30000 }
    )

    // 6️⃣ Response
    return res.status(200).json({
      success: true,
      answer: answerResponse.data.answer,
      sources: orderedChunks.map(c => ({
        file: c.file_id,
        chunk: c.chunk_index
      }))
    })

  } catch (error) {
    console.error("Ask Controller Error:", error.message)
    console.error("Ask Controller Error:", error.response?.data || error.message)

    return res.status(500).json({
      success: false,
      message: "Failed to generate answer"
    })
  }
}

export default askController