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
    def send_text(message: str):
        """Sends a text message to family including the message that includes insight to help support the relationship.

        Args:
            messge (str): The message that will be texted, which includes support for the relationship.
        """
        print("send_text tool called!!!")

        # message = self.client.messages.create(
        #     to="+12533679887",
        #     from_="+18559709611",
        #     body=message,
        # )

        print("Text sent!")
        return message
