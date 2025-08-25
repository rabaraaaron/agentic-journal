import os
from fastapi import FastAPI, HTTPException, status, Depends
from fastapi.responses import JSONResponse
import jwt
import uvicorn

from models.models import Entry, LLMRequest, User
from service.user_service import UserService
from service.entry_service import EntryService
from service.agent_service import AgentService
from fastapi.middleware.cors import CORSMiddleware
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from langchain_core.messages import HumanMessage


origins = [
    "http://localhost:3000",
    "https://agenticjournal.com",
    os.getenv("PROD_CLIENT_URL", None)
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["Authorization"],
)

security = HTTPBearer()


def verify_jwt_token(token: HTTPAuthorizationCredentials = Depends(security)) -> dict:
    """Verify JWT token and return payload"""
    try:
        payload = jwt.decode(token.credentials, os.getenv("SUPER_SECRET", "NO_SECRET"), algorithms=[
                             os.getenv("HASHING_ALGO", "HS256")])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token has expired"
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )


@app.exception_handler(jwt.ExpiredSignatureError)
async def expired_token_exception_handler(request, exc):
    return JSONResponse(
        status_code=401,
        content={"detail": "Token has expired",
                 "custom_field": "additional_info"}
    )


@app.exception_handler(jwt.InvalidTokenError)
async def invalid_token_exception_handler(request, exc):
    return JSONResponse(
        status_code=401,
        content={"detail": "Invalid token", "custom_field": "additional_info"}
    )


@app.get("/health")
async def health():
    return JSONResponse(content={"detail": "Hello world!!!"})


@app.post("/user/create")
async def create_user(request: User):
    status = UserService().create_user(user=request)
    response = JSONResponse(content={
                            "detail": f"Your signup attempt was {"successful" if status else "denied. Someone already has that email."}."}, status_code=status)
    if status == 200:
        token = UserService().login(user=request)
        response.headers["Authorization"] = f"Bearer {token}"

    return response


@app.post("/user/login")
async def login(request: User):
    token = UserService().login(user=request)
    if isinstance(token, int):
        return JSONResponse(content={"detail": f"Your login attempt was denied due to incorrect {"email" if token == 1 else "password"}."}, status_code=400)
    response = JSONResponse(
        content={"detail": f"Your login attempt was successful."})
    response.headers["Authorization"] = f"Bearer {token}"
    return response


@app.post("/user/verify")
async def verify(current_user: dict = Depends(verify_jwt_token)):
    return JSONResponse(content="Success", status_code=200)


@app.post("/user/entry")
async def submit_entry(entry: Entry, current_user: dict = Depends(verify_jwt_token)):
    EntryService().add_or_update_entry(user_entry=entry,
                                       email=current_user.get("email", "No email"))
    state = {
        'messages': [HumanMessage(content=f"""Monitor user's emotional wellbeing and support their relationship.
                A new entry was just submitted. Address users by email. Use your tools to:
                - Gather ALL necessary information first.
                - Notify the discord, only once, with how the user is feeling.

                Entry:
                    email - {current_user.get("email", "No email")}
                    date_selected - {entry.date_selected}
                    message - {entry.message}""")]
    }
    AgentService().graph.invoke(state)
    return JSONResponse(content={"detail": "Thank you for your submission!"})


@app.get("/{user_id}/entries")
async def user_entries(user_id: str):
    return JSONResponse(content={"detail": f"A request to see a user's entries submitted for user {user_id}"})


@app.post("/llm/answer")
async def llm_answer(request: LLMRequest):
    response = AgentService().run(prompt=request.prompt)
    return JSONResponse(content={"detail": response})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
