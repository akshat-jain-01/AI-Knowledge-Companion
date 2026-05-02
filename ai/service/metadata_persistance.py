import json
import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))
STORAGE_DIR = os.path.join(BASE_DIR, "storage")

os.makedirs(STORAGE_DIR, exist_ok=True)

# META_PATH = os.path.join(STORAGE_DIR, "metadata.json")



def get_metadata_path(file_id):
    return os.path.join(STORAGE_DIR, f"{file_id}.json")



# def save_metadata(metadata):
#     with open(META_PATH, "w") as f:
#         json.dump(metadata, f)




def save_metadata(metadata_list, file_id):
    path = get_metadata_path(file_id)

    with open(path, "w") as f:
        json.dump(metadata_list, f)





# def load_metadata():
#     if os.path.exists(META_PATH):
#         with open(META_PATH, "r") as f:
#             return json.load(f)
#     return []




def load_metadata(file_id):
    path = get_metadata_path(file_id)

    if os.path.exists(path):
        with open(path, "r") as f:
            return json.load(f)

    return []