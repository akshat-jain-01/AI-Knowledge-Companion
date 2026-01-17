from sentence_transformers import SentenceTransformer

model = SentenceTransformer("all-MiniLM-L6-v2")

def generate_embedding(text : str):
    if not text or not text.strip():
        raise ValueError("Text is empty")
    
    embedding = model.encode(text)

    return embedding.tolist()