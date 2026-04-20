import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
STORAGE_DIR = os.path.join(BASE_DIR, "storage")

os.makedirs(STORAGE_DIR, exist_ok=True)

META_PATH = os.path.join(STORAGE_DIR, "metadata.json")

def save_metadata(metadata):
    with open(META_PATH, "w") as f:
        json.dump(metadata, f)

def load_metadata():
    if os.path.exists(META_PATH):
        with open(META_PATH, "r") as f:
            return json.load(f)
    return []