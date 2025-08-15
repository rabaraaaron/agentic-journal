from langchain_ollama import ChatOllama


class LLMService:

    def __init__(self):
        self.llm = ChatOllama(
            model="qwen2.5:7b",
            base_url="http://ollama:11434",
            temperature=0.7,
            num_predict=512,      # Limit output length for speed
            keep_alive="10m",
            num_ctx=4096,
        )
