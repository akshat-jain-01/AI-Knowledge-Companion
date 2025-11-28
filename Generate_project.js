const fs = require("fs");
const path = require("path");

const structure = {
    "backend": {
        "src": {
            "config": {
                "default.js": "",
                "db.js": ""
            },
            "routes": {
                "uploadRoutes.js": "",
                "summaryRoutes.js": "",
                "chatRoutes.js": ""
            },
            "controllers": {
                "uploadController.js": "",
                "summaryController.js": "",
                "chatController.js": ""
            },
            "services": {
                "uploadService.js": "",
                "summaryService.js": "",
                "embeddingService.js": "",
                "chatService.js": ""
            },
            "utils": {
                "logger.js": "",
                "response.js": ""
            },
            "app.js": "",
            "server.js": ""
        },

        // clean + updated package.json
        "package.json":
`{
  "name": "backend",
  "type": "module",
  "scripts": {
    "start": "node src/server.js",
    "dev": "nodemon src/server.js"
  },
  "dependencies": {
    "express": "^4.19.2",
    "cors": "^2.8.5",
    "mongoose": "^7.0.0",
    "morgan": "^1.10.0",
    "dotenv": "^16.4.5",
    "axios": "^1.6.5"
  },
  "devDependencies": {
    "nodemon": "^3.1.0"
  }
}`
    },

    // ----------------------------------------------
    // AI Folder (Optimized for RAG pipeline)
    // ----------------------------------------------
    "ai": {
        "ingest": {
            "process_pdf.py": "",
            "process_docx.py": "",
            "ocr.py": ""
        },
        "embeddings": {
            "embedder.py": ""
        },
        "models": {
            "summarizer": {
                "summarizer.py": ""
            },
            "topic_model": {
                "topic_model.py": ""
            },
            "reranker": {
                "rerank.py": ""
            }
        },
        "rag": {
            "chunk.py": "",
            "vector_store.py": "",
            "search.py": ""
        },
        "pipelines": {
            "master_pipeline.py": ""
        },
        "notebooks": {
            "eda.ipynb": ""
        },

        // optimized requirements.txt
        "requirements.txt":
`sentence-transformers
pypdf
numpy
pandas
fastapi
uvicorn
paddleocr
transformers
torch
accelerate
faiss-cpu
`
    },

    // ----------------------------------------------
    // FRONTEND (React / Vite optimized structure)
    // ----------------------------------------------
    "frontend": {
        "src": {
            "components": {
                "Navbar.jsx": "",
                "FileUploader.jsx": "",
                "SummaryCard.jsx": "",
                "ChatBox.jsx": "",
                "Loader.jsx": ""
            },
            "pages": {
                "Home.jsx": "",
                "Dashboard.jsx": "",
                "Chat.jsx": ""
            },
            "context": {
                "AppContext.jsx": ""
            },
            "styles": {
                "global.css": ""
            },
            "utils": {
                "api.js": ""
            },
            "App.jsx": "",
            "main.jsx": ""
        },
        "public": {
            "index.html": ""
        },

        "package.json":
`{
  "name": "frontend",
  "dependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "axios": "^1.6.5"
  }
}`
    },

    // ----------------------------------------------
    // Documentation
    // ----------------------------------------------
    "docs": {
        "README.md": "# AI Knowledge Companion Documentation"
    }
};


// ----------------------------------------------
// Recursive Structure Creation Function
// ----------------------------------------------

function createStructure(base, obj) {
    for (let item in obj) {
        const target = path.join(base, item);

        if (typeof obj[item] === "string") {
            fs.writeFileSync(target, obj[item]);
        } 
        else {
            if (!fs.existsSync(target)) {
                fs.mkdirSync(target);
            }
            createStructure(target, obj[item]);
        }
    }
}

createStructure(process.cwd(), structure);
console.log("🔥 Optimized AKC Project Structure created successfully!");
