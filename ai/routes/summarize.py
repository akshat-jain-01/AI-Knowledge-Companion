from fastapi import APIRouter
from service.Summary_service import generate_summary
from service.llm_service import generate_answer
from service.prompt_builder import build_prompt

router = APIRouter()

@router.post('/summarize')
def summarize(payload: dict):
    file_id = payload.get("file_id")
    level = payload.get("level", "short")

    if not file_id:
        return {"status": "error", "message": "file_id is required"}

    if level not in ["short", "medium", "detailed"]:
        return {"status": "error", "message": "Invalid summary level"}

    # Get text from the payload instead of metadata_store
    text = payload.get("text", "")
    if not text:
        return {"status": "error", "message": "No text provided for summarization"}

    summary = generate_summary(text, level)

    return {
        "status": "success",
        "level": level,
        "summary": summary
    }