from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

@router.get("/health")
async def read_root():
    return {
        "status" : "ok",
        "service": "ai-knowledge-companion"
    }