import os
from langchain_ollama import ChatOllama


class LLMService:

    def __init__(self):
        self.llm = ChatOllama(
            model=os.getenv("LLM_MODEL", None),
            base_url=os.getenv("OLLAMA_URL", None),
            temperature=0.7,
            num_predict=512,      # Limit output length for speed
            keep_alive="10m",
            num_ctx=4096,
        )
