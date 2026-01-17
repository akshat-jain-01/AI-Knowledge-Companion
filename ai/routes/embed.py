from fastapi import APIRouter
from pydantic import BaseModel
from service.Embedding_service import generate_embedding

router = APIRouter()

class EmbedRequest(BaseModel):
    user_id: str
    file_id: str
    text: str

@router.post("/embed")
async def ingest_data(data : EmbedRequest):
    if not data.text or not data.text.strip():
        return{
            "status": "error",
            "message" : "Text is empty"
        }
    
    embeddings = generate_embedding(data.text)

    return{
        "status" : "success",
        "embedding" : embeddings
    }
    
    