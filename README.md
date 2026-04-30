# AI Knowledge Companion (RAG System)

An AI-powered system that allows users to upload documents (PDF/DOCX) and ask questions using natural language.

## Features
- Document upload and parsing (PDF/DOCX)
- Text chunking and embedding generation
- Semantic search using FAISS
- Context-aware answer generation using LLM (FLAN-T5)
- ChatGPT-style conversational interface
- User-specific document context (JWT-based)

## Tech Stack
- Frontend: Next.js, React, Tailwind CSS
- Backend: Node.js (API orchestration), FastAPI (ML services)
- Vector DB: FAISS
- Embeddings: SentenceTransformers
- LLM: FLAN-T5 (HuggingFace)

## How it Works
1. User uploads document
2. Backend splits into chunks
3. Embeddings generated using SentenceTransformers
4. Stored in FAISS vector index
5. User query → embedding → similarity search
6. Top-k chunks passed to LLM → answer generated

## Example Flow
- Upload: Research paper PDF  
- Query: "What is the main contribution?"  
- Output: Context-aware summarized answer  

## Key Highlights
- Built complete RAG pipeline from scratch
- Efficient retrieval using FAISS
- Modular backend with FastAPI + Node.js
- Supports multiple documents per user
