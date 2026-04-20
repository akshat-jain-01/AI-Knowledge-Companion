from collections import deque

memory_store = {}

def get_memory(user_id):
    if user_id not in memory_store:
        memory_store[user_id] = deque(maxlen=4)
    return memory_store[user_id]

def add_message(user_id, role, message):
    memory = get_memory(user_id)
    memory.append({
        "role": role,
        "content": message
    })

def get_history_text(user_id):
    memory = get_memory(user_id)
    return "\n".join(
        [f"{m['role']}: {m['content']}" for m in memory]
        )