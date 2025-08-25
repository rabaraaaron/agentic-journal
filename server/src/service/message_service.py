import urllib3
from discord_webhook import DiscordWebhook
import requests
from langchain_core.tools import tool


# Disable SSL warnings
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Monkey patch the requests session to disable SSL verification
original_request = requests.Session.request


def patched_request(self, *args, **kwargs):
    kwargs['verify'] = False
    return original_request(self, *args, **kwargs)


class MessageService:

    @tool
    def send_text(message: str):
        """Sends a text message to the discord group

        Args:
            messge (str): The message that will be texted, which includes support for the relationship.
        """
        print("send_text tool called!!!")
        requests.Session.request = patched_request

        url = "https://discord.com/api/webhooks/1407781995479699566/SuoE8dHgtbGSGKp1pXo1FiDdOgDjr4QysMaRLpGkN2yYDEygw_ZxmC059VV-WneBLP00"
        webhook = DiscordWebhook(url=url, content=message)
        response = webhook.execute()

        if response.status_code == 200:
            print("Message sent successfully!")
        else:
            print(f"Failed to send message: {response.status_code}")

        return message
