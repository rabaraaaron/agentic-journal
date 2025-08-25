from datetime import datetime, timedelta
from models.models import User as PydanticUser
from data_access.schema import User as SQLAlchemyUser
from data_access.pg_client import PGClient
import jwt
from passlib.context import CryptContext
import os


class UserService:

    def __init__(self):
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def create_user(self, user: PydanticUser) -> int:
        with PGClient.get_session() as session:
            new_user = SQLAlchemyUser(
                username=user.username,
                email=user.email,
                password=self.pwd_context.hash(
                    os.getenv("SALT", "NO_SALT") + user.password),
                discord_webhook_url=user.discord_webhook_url
            )
            existing_user = session.query(
                SQLAlchemyUser).get(user.email)
            if existing_user:
                return 400
            session.add(new_user)
            return 200

    def login(self, user: PydanticUser, algorithm=os.getenv("HASHING_ALGO", "HS256")) -> int | str:
        with PGClient.get_session() as session:
            retrieved_user: SQLAlchemyUser = session.query(
                SQLAlchemyUser).get(user.email)
            if not retrieved_user:
                return 0
            if not self.pwd_context.verify(os.getenv("SALT", "NO_SALT") + user.password, retrieved_user.password):
                return 1

        payload_data = {}
        payload_data['email'] = user.email
        payload_data['password'] = user.password
        payload_data['exp'] = datetime.now() + timedelta(hours=12)

        encoded_jwt = jwt.encode(
            payload_data, os.getenv("SUPER_SECRET", "NO_SECRET"), algorithm=algorithm)
        return encoded_jwt
