# 🧠 AI Knowledge Companion (RAG-based System)

An AI-powered document assistant that enables users to upload PDFs/DOCX files and ask questions using natural language. The system uses Retrieval-Augmented Generation (RAG) with semantic search to provide accurate, context-aware answers.

---

## 🚀 Features

* 📄 Upload and process PDF/DOCX documents
* 🔍 Semantic search using FAISS vector database
* 🤖 Context-aware answers using LLM (FLAN-T5)
* 💬 ChatGPT-style UI with document-based chat
* 🔐 User-specific document isolation (JWT auth)
* ⚡ Optimized retrieval pipeline (low latency + high accuracy)

---

## 🧠 How It Works (Pipeline)

1. Document upload → text extraction
2. Text → chunking (semantic + paragraph aware)
3. Chunk → embedding (SentenceTransformers)
4. Store embeddings in FAISS
5. User query → embedding
6. FAISS retrieves top relevant chunks
7. Context built from chunks
8. LLM generates final answer

---

## 🏗️ Tech Stack

### Frontend

* React.js / Next.js
* Tailwind CSS

### Backend

* Node.js + Express.js
* FastAPI (AI services)

### AI / ML

* SentenceTransformers (embeddings)
* FAISS (vector search)
* FLAN-T5 (LLM)

### Database

* MongoDB (chunk storage + metadata)

---

## ⚙️ Key Engineering Decisions

* ✅ **Chunking Strategy:** Hybrid (paragraph + sentence) for better semantic retrieval
* ✅ **File-specific FAISS indexing:** Ensures accurate and isolated retrieval
* ✅ **Context Limiting:** Improves latency without sacrificing accuracy
* ❌ Avoided heavy reranking to reduce latency for small datasets
* ⚖️ Balanced trade-off between accuracy and performance

---

## ⚡ Performance

* Optimized token usage for faster LLM inference
* Efficient retrieval with FAISS (milliseconds search time)

---

## 🧪 Example Queries

* "List technologies mentioned"
* "Tell me about all the rounds of the given hackathon"

---

## 📸 Screenshots

(Add UI screenshots here)

---

## 🛠️ Setup Instructions

### 1. Clone the repo

```bash
git clone https://github.com/akshat-jain-01/AI-Knowledge-Companion.git
cd project-folder
```

### 2. Install dependencies

```bash
npm install
pip install -r requirements.txt
```

### 3. Setup environment variables

```env
AI_SERVICE_BASE_URL=http://localhost:8000
MONGO_URI=your_mongo_url
JWT_SECRET=your_secret
```

### 4. Run backend

```bash
npm run dev
```

### 5. Run AI service

```bash
uvicorn app:app --reload --port 8000
```

---

## 📌 Future Improvements

* Multi-document querying
* Hybrid search (BM25 + vector)
* Query rewriting for better retrieval
* Streaming responses
* Advanced reranking models

---

## 🙌 Author

Akshat Jain
📧 akshatjainkht01@gmail.com
🔗 GitHub: https://github.com/akshat-jain-01
🔗 LinkedIn: https://linkedin.com/in/akshat-jain-1a71b4376
