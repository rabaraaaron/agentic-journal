from models.models import User as PydanticUser
from data_access.schema import User as SQLAlchemyUser
from data_access.pg_client import PGClient


class UserService:

    def create_user(self, user: PydanticUser) -> bool:
        with PGClient.get_session() as session:
            new_user = SQLAlchemyUser(
                username=user.username,
                email=user.email,
                password=user.password
            )
            if self.login(user=user):
                return False
            session.add(new_user)
            return True

    def login(self, user: PydanticUser):
        with PGClient.get_session() as session:
            retrieved_user: SQLAlchemyUser = session.query(
                SQLAlchemyUser).get(user.email)
            if not retrieved_user:
                return False
            return retrieved_user.password == user.password
