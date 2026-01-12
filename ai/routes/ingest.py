from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class IngestRequest(BaseModel):
    user_id: str
    file_id: str
    text: str

@router.post("/ingest")
async def ingest_data(data : IngestRequest):
    if not data.text:
        return{
            "status": "error",
            "message" : "Text is empty"
        }
    
    return{
        "status": "success",
        "message" : "Text received"
    }