from utils.summary_prompt import build_summary_prompt
from service.llm_service import generate_answer

def generate_summary(text: str, level: str)->str:
    max_len = {
        "short" : 200,
        "medium" : 350,
        "detailed" : 550
    }[level]

    prompt = build_summary_prompt(text, level)

    # Use the generate_answer function instead of calling llm directly
    response = generate_answer(prompt)

    return response