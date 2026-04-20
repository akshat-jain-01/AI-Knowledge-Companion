import os
import faiss


BASE_DIR = os.path.dirname(os.path.dirname(__file__))
STORAGE_DIR = os.path.join(BASE_DIR, "storage")

os.makedirs(STORAGE_DIR, exist_ok=True)

INDEX_FILE = os.path.join(STORAGE_DIR, "faiss_index.bin")

def save_index(index):
    faiss.write_index(index, INDEX_FILE)
    print(f"Index saved to {INDEX_FILE}")

def load_index(dimension):
    if os.path.exists(INDEX_FILE):
        index = faiss.read_index(INDEX_FILE)
        print(f"Index loaded from {INDEX_FILE}")
        return index
    else:
        print("Creating new FAISS index")
        return faiss.IndexFlatIP(dimension)