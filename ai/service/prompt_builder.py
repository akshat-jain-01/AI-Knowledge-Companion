def build_prompt(context_or_chunks, question: str, history) -> str:
    system_instruction = (
        "You are a helpful AI assistant.\n"
        "Answer the question using the provided context.\n"
        "Be concise and clear.\n"
        "Only say 'I don't know' if the answer is completely missing.\n"
    )

    # Check if context_or_chunks is a string (context) or list (chunks)
    if isinstance(context_or_chunks, str):
        # It's a context string
        context = context_or_chunks
        prompt = (
            f"{system_instruction}\n"
            f"Conversation history:\n{history}\n"
            f"Context:\n{context}\n"
            f"Question:\n{question}\n"
            f"Answer:"
        )
    else:
        # It's a list of chunks
        chunks = context_or_chunks
        context_block = ""
        for i, chunk in enumerate(chunks):
            context_block += f"\n--- Chunk {i} ---\n{chunk['text']}\n"

        prompt = (
            f"{system_instruction}\n"
            f"Conversation history:\n{history}\n"
            f"Context:\n{context_block}\n"
            f"Question:\n{question}\n"
            f"Answer:"
        )

    return prompt



# def build_prompt(chunks: list[dict], question : str) ->str:
#     system_instruction = (
#     "You are a helpful AI assistant.\n"
#     "You are given excerpts from a technical document.\n"
#     "The question may require summarizing the overall goal or problem.\n"
#     "Infer the answer by combining information from the context.\n"
#     "Use only the context provided.\n"
#     "If the answer cannot be inferred, say 'I don't know'.\n"
# )

#     context_block = ""

#     for i, chunk in enumerate(chunks):
#         # context_block += f"\n [chunk{i}]\n{chunk['text']}\n"
#         context_block += f"\n[chunk{i}]\n{chunk}\n" 

#     prompt = (
#         f"{system_instruction}\n"
#         f"context : \n{context_block}\n"
#         f"Question : \n{question}\n"
#         f"Answer :"
#     )

#     return prompt


# def build_prompt(context: str, question: str) -> str:  # 001: Changed parameter from chunks: list[dict] to context: str to match the new usage in ask.py
#     system_instruction = (
#         "You are a helpful AI assistant.\n"
#         "You are given excerpts from a technical document.\n"
#         "The question may require summarizing the overall goal or problem.\n"
#         "Infer the answer by combining information from the context.\n"
#         "Use only the context provided.\n"
#         "If the answer cannot be inferred, say 'I don't know'.\n"
#     )

#     context_block = f"\nContext:\n{context}\n"  # 001: Simplified to directly use the context string instead of iterating over chunks

#     prompt = (
#         f"{system_instruction}\n"
#         f"{context_block}\n"
#         f"Question: {question}\n"
#         f"Answer:"
#     )

#     return prompt