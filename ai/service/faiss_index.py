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
from service.faiss_persistence import load_index, save_index
from service.metadata_persistance import load_metadata, save_metadata

EMBEDDING_DIM = 384

# 🔥 cosine similarity via inner product (with normalization)
#index = load_index(EMBEDDING_DIM)





#pehle sabhi index load ho rhe the ab file specific index load karenge aur uske sath hi metadata bhi load karenge


index_map = {}

metadata_map = {} 










#   mapping store (ONLY identifiers, no text)
#   metadata_store = load_metadata()


def add_embedding(embedding: list[float], metadata: dict):
    """
    embedding: list of floats (384-d)
    metadata: { user_id, file_id, chunk_index }
    """

    if not embedding or len(embedding) != EMBEDDING_DIM:
        raise ValueError("Invalid embedding size")

    if not metadata.get("file_id") or metadata.get("chunk_index") is None:
        raise ValueError("Invalid metadata")


    file_id = metadata["file_id"]

    if(file_id not in index_map):
        index_map[file_id] = load_index(file_id)

    

    if(file_id not in metadata_map):
        metadata_map[file_id] = load_metadata(file_id)


    index = index_map[file_id]


    # index.add(vector)
    # save_index(index)  #  persist index after each addition




    vector = np.array([embedding], dtype="float32")
    faiss.normalize_L2(vector)


    index.add(vector)



    # store only mapping info



    metadata_map[file_id].append({
        "user_id": metadata["user_id"],
        "file_id": metadata["file_id"],
        "chunk_index": metadata["chunk_index"]
    })

    save_index(index, file_id)
    save_metadata(metadata_map[file_id], file_id)

    

# def search(query_embedding: list[float], k: int, user_id: str, file_id: str):

#     if index.ntotal == 0:
#         return []

#     query_vector = np.array([query_embedding], dtype="float32")
#     faiss.normalize_L2(query_vector)

#     requested_k = k
#     search_k = min(max(k * 50, 100), index.ntotal)  # 🔥 overfetch farther to find relevant chunks

#     distances, indices = index.search(query_vector, search_k)

#     results = []

#     for idx in indices[0]:
#         if idx == -1 or idx >= len(metadata_store):
#             continue

#         meta = metadata_store[idx]

#         # STRICT FILTER
#         if meta["user_id"] == user_id and meta["file_id"] == file_id:
#             results.append(meta)

#         if len(results) >= requested_k:
#             break

#     return results[:requested_k]




def search(query_embedding: list[float], k: int, user_id: str, file_id: str):

    if file_id not in index_map:
        index_map[file_id] = load_index(file_id)

    if file_id not in metadata_map:
        metadata_map[file_id] = load_metadata(file_id)

    index = index_map[file_id]
    metadata_list = metadata_map[file_id]

    if index.ntotal == 0:
        return []

    query_vector = np.array([query_embedding], dtype="float32")
    faiss.normalize_L2(query_vector)

    distances, indices = index.search(query_vector, k)

    results = []

    for idx in indices[0]:
        if idx == -1 or idx >= len(metadata_list):
            continue

        meta = metadata_list[idx]

        if meta["user_id"] == user_id:
            results.append(meta)

    return results