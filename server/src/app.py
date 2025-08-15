import time
from fastapi import FastAPI
import uvicorn
import schedule

from models.models import Entry, LLMRequest, User
from service.message_service import MessageService
from service.user_service import UserService
from service.entry_service import EntryService
from service.agent_service import AgentService


app = FastAPI()


@app.post("/user/create")
async def create_user(request: User):
    success = UserService().create_user(user=request)
    return {
        "message":
        f"User {request.username} successfully created." if success else f"User {request.username} failed to create."
    }


@app.post("/user/login")
async def login(request: User):
    success = UserService().login(user=request)
    return {
        "message":
        f"Your login attempt was {"successful" if success else "denied"}."
    }


@app.post("/user/entry")
async def submit_entry(request: Entry):
    EntryService().add_or_update_entry(user_entry=request)
    state = {'messages': []}
    state['messages'].append(f"""Monitor user's emotional wellbeing and support their relationship.
                A new entry was just submitted. Use your tools to:
                - Gather ALL necessary information first.
                - Decide if family notification is needed through an insightful message, giving tailored advice based on the context.
                             
                Entry:
                    email - {request.email}
                    date_selected - {request.date_selected}
                    message - {request.message}""")
    AgentService().graph.invoke(state)
    return {
        "message":
        f"{state}"
    }


@app.get("/{user_id}/entries")
async def user_entries(user_id: str):
    return {
        "message":
        f"A request to see a user's entries submitted for user {user_id}"
    }


@app.post("/entries/send_sms")
async def send_sms(request: LLMRequest):
    MessageService().send_email_to_sms(to_number="2533679887@txt.att.net",
                                       message=request.prompt)
    return {"message": "Success!!!"}


# @app.post("/entries/previous/days")
# async def get_previous_x_entries_days(days: int):
#     if days < 0:
#         return {"message": "Almost got me there!!!"}
#     entries = EntryService().get_entries_from_last_x_days(days=days)
#     return {"message": f"Here are the last {days} days: {entries}"}


# @app.post("/entries/previous/amount")
# async def get_previous_x_entries_count(amount: int):
#     if amount < 0:
#         return {"message": "Almost got me there!!!"}
#     entries = EntryService().get_last_x_entries(amount=amount)
#     return {"message": f"Here are the last {amount} entries: {entries}"}


@app.post("/llm/answer")
async def llm_answer(request: LLMRequest):
    response = AgentService().run(prompt=request.prompt)
    return {"message": response}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)


def print_it():
    print("Oh yea print it!!!")
