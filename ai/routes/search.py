from fastapi import APIRouter
from pydantic import BaseModel
from service.Embedding_service import generate_embedding
from service.faiss_index import search as faiss_search

router = APIRouter()


class SearchRequest(BaseModel):
    query: str
    top_k: int = 3


@router.post("/search")
async def search_chunks(data: SearchRequest):
    if not data.query or not data.query.strip():
        return {
            "status": "error",
            "message": "Query is empty"
        }

    query_embedding = generate_embedding(data.query)

    results = faiss_search(query_embedding, data.top_k)

    return {
        "status": "success",
        "results": results
    }
