from service.entry_service import EntryService
from service.message_service import MessageService
from service.llm_service import LLMService
from langgraph.prebuilt import ToolNode


from typing import Annotated

from typing_extensions import TypedDict

from langgraph.graph import StateGraph, START, END
from langgraph.graph.message import add_messages


class ChatState(TypedDict):
    # Messages have the type 'list'. The `add_messages` function
    # in the annotation defines how this state key should be updated
    # (in this case, it appends messages to the list, rather than overwriting them)
    messages: Annotated[list, add_messages]


class AgentService:

    def __init__(self):
        self.entry_service = EntryService
        self.message_service = MessageService
        self.llm_with_tools = LLMService().llm.bind_tools(
            [
                self.entry_service.get_entries_from_last_x_days,
                self.entry_service.get_last_x_entries,
                self.message_service.send_text
            ]
        )
        self.tool_node = ToolNode(
            [
                self.entry_service.get_entries_from_last_x_days,
                self.entry_service.get_last_x_entries,
                self.message_service.send_text
            ]
        )
        self.graph_builder = StateGraph(ChatState)
        self.graph_builder.add_node('llm', self.llm_node)
        self.graph_builder.add_node('tools', self.tools_node)
        self.graph_builder.add_edge(START, 'llm')
        self.graph_builder.add_edge('tools', 'llm')
        self.graph_builder.add_conditional_edges('llm', self.router, {
            'tools': 'tools', 'end': END})
        self.graph = self.graph_builder.compile()

    def llm_node(self, state):
        response = self.llm_with_tools.invoke(state['messages'])
        print(f"Response from llm_node: {response}")
        return {'messages': state['messages'] + [response]}

    def tools_node(self, state):
        response = self.tool_node.invoke(state)
        print(f"Response from tool_node: {response}")
        return {
            'messages': state['messages'] + response['messages']
        }

    def router(self, state):
        last_message = state['messages'][-1]
        return 'tools' if getattr(last_message, 'tool_calls', None) else 'end'
