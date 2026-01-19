from fastapi import APIRouter
from pydantic import BaseModel
from service.Embedding_service import generate_embedding
from service.faiss_index import add_embedding

router = APIRouter()

class EmbedRequest(BaseModel):
    user_id: str
    file_id: str
    text: str
    chunk_index : int

@router.post("/embed")
async def ingest_data(data : EmbedRequest):
    if not data.text or not data.text.strip():
        return{
            "status": "error",
            "message" : "Text is empty"
        }
    
    embedding = generate_embedding(data.text)

    metadata = {
        "user_id": data.user_id,
        "file_id": data.file_id,
        "chunk_index": data.chunk_index,
        "text": data.text
    }

    add_embedding(embedding, metadata)

    return{
        "status" : "success",
        "message": "Chunk embedded and stored successfully"
    }
    
    