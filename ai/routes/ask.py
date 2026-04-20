# from fastapi import APIRouter
# from pydantic import BaseModel

# from service.Embedding_service import generate_embedding
# from service.faiss_index import search as faiss_search
# from service.prompt_builder import build_prompt
# from service.llm_service import generate_answer

# router = APIRouter()

# class AskRequest(BaseModel):
#     question: str
#     top_k: int = 3

# @router.post("/ask")
# async def ask_question(data: AskRequest):
#     if not data.question or not data.question.strip():
#         return {
#             "status": "error",
#             "message": "Question is empty"
#         }

#     # query_embedding = generate_embedding(data.question)

#     # chunks = faiss_search(query_embedding, data.top_k)

#     if not chunks:
#         return {
#             "status": "success",
#             "answer": "I don't know",
#             "sources": []
#         }

#     prompt = build_prompt(chunks, data.question)

#     answer = generate_answer(prompt)

#     return {
#         "status": "success",
#         "answer": answer,
#         "sources": [c["chunk_index"] for c in chunks]
#     }


from fastapi import APIRouter
from pydantic import BaseModel

from service.prompt_builder import build_prompt
from service.llm_service import generate_answer

router = APIRouter()

class AskRequest(BaseModel):
    question: str
    context: str   # 🔥 context aayega Node se


@router.post("/ask")
async def ask_question(data: AskRequest):

    # ❌ old chunks logic hata diya
    # ✅ new context check

    if not data.context or not data.context.strip():
        return {
            "status": "success",
            "answer": "I don't know"
        }

    # 🔥 build prompt
    prompt = build_prompt(data.context, data.question)

    print("========== DEBUG ==========")
    print("QUESTION:", data.question)
    print("CONTEXT:\n", data.context)
    print("===========================")

    # 🔥 LLM call
    answer = generate_answer(prompt)

    return {
        "status": "success",
        "answer": answer
    }