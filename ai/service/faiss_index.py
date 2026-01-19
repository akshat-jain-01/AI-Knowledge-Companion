import numpy as np
import faiss

EMBEDDING_DIM = 384

index = faiss.IndexFlatIP(EMBEDDING_DIM)

metadata_store = []


def add_embedding(embedding: list[float], metadata: dict):
    """
    embedding: list of floats (384-d)
    metadata: { user_id, file_id, chunk_index, text }
    """
    vector = np.array([embedding], dtype="float32")
    faiss.normalize_L2(vector)

    index.add(vector)
    metadata_store.append(metadata)


def search(query_embedding: list[float], k: int = 3):
    """
    query_embedding: list[float]
    return: list of metadata dicts
    """
    if index.ntotal == 0:
        return []

    query_vector = np.array([query_embedding], dtype="float32")
    faiss.normalize_L2(query_vector)

    distances, indices = index.search(query_vector, k)

    results = []
    for idx in indices[0]:
        if idx == -1:
            continue
        results.append(metadata_store[idx])

    return results
