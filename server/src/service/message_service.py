from twilio.rest import Client
from langchain_core.tools import tool


class MessageService:

    def __init__(self):
        self.account_sid = "ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
        self.auth_token = "your_auth_token"
        self.client = Client(self.account_sid, self.auth_token)

    def text_number(self, number: str, message: str):
        return f"This number {number} was texted with this message: {message}"

    @tool
    def send_text(self, message: str):
        """Sends a text message to family including the message that is a summary of how the individual is feeling."""
        message = self.client.messages.create(
            to="+12533679887",
            from_="+18559709611",
            body=message,
        )

        print("Text sent!")
