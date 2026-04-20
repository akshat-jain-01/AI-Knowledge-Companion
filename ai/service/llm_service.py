from transformers import pipeline


llm = pipeline(
    task="text2text-generation",
    model="google/flan-t5-base"
)

def generate_answer(prompt: str) -> str:
    if not prompt or not prompt.strip():
        return "Invalid prompt"

    response = llm(
        prompt,
        max_length=512,
        do_sample=True,
        temperature=0.7,
        num_beams=4
    )

    return response[0]["generated_text"]

# from transformers import pipeline

# llm = pipeline(
#     task="text2text-generation",
#     model="google/flan-t5-large"
# )

# def generate_answer(prompt: str) -> str:
#     if not prompt or not prompt.strip():
#         return "Invalid prompt"
    
#     response = llm(
#         prompt,
#         max_length=512,  # 001: Increased max_length from 256 to 512 to allow longer answers
#         do_sample=True,  # 001: Enabled sampling (do_sample=True) to make responses more varied and less deterministic, potentially improving answer quality
#         temperature=0.7  # 001: Added temperature=0.7 for controlled randomness in generation
#     )

#     return response[0]["generated_text"]