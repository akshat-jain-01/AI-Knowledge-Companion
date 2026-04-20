# import numpy as np
# import faiss

# EMBEDDING_DIM = 384

# index = faiss.IndexFlatIP(EMBEDDING_DIM)

# metadata_store = []


# def add_embedding(embedding: list[float], metadata: dict):
#     """
#     embedding: list of floats (384-d)
#     metadata: { user_id, file_id, chunk_index }
#     """
#     vector = np.array([embedding], dtype="float32")
#     faiss.normalize_L2(vector)

#     index.add(vector)
#     metadata_store.append(metadata)


# def search(query_embedding: list[float], k: int = 3):
#     """
#     query_embedding: list[float]
#     return: list of metadata dicts
#     """
#     if index.ntotal == 0:
#         return []

#     query_vector = np.array([query_embedding], dtype="float32")
#     faiss.normalize_L2(query_vector)

#     distances, indices = index.search(query_vector, k)

#     results = []
#     for idx in indices[0]:
#         if idx == -1:
#             continue
#         results.append(metadata_store[idx])

#     return results


import numpy as np
import faiss

EMBEDDING_DIM = 384

# 🔥 cosine similarity via inner product (with normalization)
index = faiss.IndexFlatIP(EMBEDDING_DIM)

# 🔥 mapping store (ONLY identifiers, no text)
metadata_store = []


def add_embedding(embedding: list[float], metadata: dict):
    """
    embedding: list of floats (384-d)
    metadata: { user_id, file_id, chunk_index }
    """

    if not embedding or len(embedding) != EMBEDDING_DIM:
        raise ValueError("Invalid embedding size")

    if not metadata.get("file_id") or metadata.get("chunk_index") is None:
        raise ValueError("Invalid metadata")

    vector = np.array([embedding], dtype="float32")
    faiss.normalize_L2(vector)

    index.add(vector)

    # 🔥 store only mapping info
    metadata_store.append({
        "user_id": metadata["user_id"],
        "file_id": metadata["file_id"],
        "chunk_index": metadata["chunk_index"]
    })


def search(query_embedding: list[float], k: int = 3):
    """
    query_embedding: list[float]
    return: list of metadata dicts
    """

    if index.ntotal == 0:
        return []

    if not query_embedding or len(query_embedding) != EMBEDDING_DIM:
        raise ValueError("Invalid query embedding")

    query_vector = np.array([query_embedding], dtype="float32")
    faiss.normalize_L2(query_vector)

    # 🔥 safe k (important)
    k = min(k, index.ntotal)

    distances, indices = index.search(query_vector, k)

    results = []

    for idx in indices[0]:
        if idx == -1:
            continue

        # 🔥 safety check (avoid index mismatch crash)
        if idx < len(metadata_store):
            results.append(metadata_store[idx])

    return results