def build_summary_prompt(text: str, level: str):
    if level == 'short':
        task = "Summarize the following text in 3-4 bullet points:"

    elif level == "medium":
        task = "Provide a concise paragraph summary of the following text:"

    elif level == "detailed":
        task = "Provide a detailed summary of the following text:"

    else:
        raise ValueError("Invalid summary level")


    return f"{task}\n\n{text}"