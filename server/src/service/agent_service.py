from langchain_ollama import ChatOllama
from service.entry_service import EntryService
from service.message_service import MessageService
from langchain_core.messages import SystemMessage


from typing import Annotated

from typing_extensions import TypedDict

from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages


class State(TypedDict):
    # Messages have the type "list". The `add_messages` function
    # in the annotation defines how this state key should be updated
    # (in this case, it appends messages to the list, rather than overwriting them)
    messages: Annotated[list, add_messages]


graph_builder = StateGraph(State)


class AgentService:

    def __init__(self):
        self.llm = ChatOllama(
            model="qwen2.5:7b",
            base_url="http://ollama:11434",
            temperature=0.7,
            num_predict=512,      # Limit output length for speed
            keep_alive="10m",
            num_ctx=4096,
        )
        self.llm_with_tools = self.llm.bind_tools(
            [EntryService.get_entries_from_last_x_days, MessageService.send_text])

    def run(self, prompt: str) -> str:
        messages = [
            SystemMessage(
                content="Monitor user's emotional wellbeing and support their relationship"
            ),
        ]
        response = self.llm_with_tools.invoke(messages + prompt)
        print(f"LLM TOOLS CALLED: {response.tool_calls}")
        return response
