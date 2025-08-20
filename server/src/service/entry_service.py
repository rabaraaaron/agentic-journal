from datetime import datetime, timedelta, date
import zoneinfo
from langchain_core.tools import tool
from langchain_core.messages import SystemMessage

from models.models import Entry as PydanticEntry
from data_access.schema import Entry as SQLAlchemyEntry
from service.llm_service import LLMService
from sqlalchemy.orm import Session
from data_access.pg_client import PGClient

from models.models import Mood


class EntryService:

    def __init__(self):
        self.llm = LLMService().llm

    def add_or_update_entry(self, user_entry: PydanticEntry) -> None:
        with PGClient.get_session() as session:
            queried_entry: SQLAlchemyEntry | None = session.query(
                SQLAlchemyEntry).filter(SQLAlchemyEntry.date_selected == user_entry.date_selected and SQLAlchemyEntry.email == user_entry.email).first()
            if queried_entry:
                self.update_entry(user_entry=user_entry,
                                  queried_entry=queried_entry)
            else:
                self.add_entry(user_entry=user_entry, session=session)

    def add_entry(self, user_entry: PydanticEntry, session: Session) -> None:
        new_entry = SQLAlchemyEntry(
            date_selected=user_entry.date_selected,
            messages=[user_entry.message],
            moods=[
                Mood(mood).value for mood in user_entry.moods if Mood(mood)
            ],
            ratings=[user_entry.rating],
            email=user_entry.email
        )
        session.add(new_entry)

    def update_entry(
        self, user_entry: PydanticEntry, queried_entry: SQLAlchemyEntry
    ) -> None:
        queried_entry.messages.append(user_entry.message)
        queried_entry.datetime_last_modified = datetime.now(
            zoneinfo.ZoneInfo('America/New_York'))

        all_moods = queried_entry.moods + user_entry.moods
        all_moods_string = [
            Mood(mood).value for mood in all_moods if Mood(mood)
        ]
        all_moods_set = set(all_moods_string)
        queried_entry.moods = list(all_moods_set)

        queried_entry.ratings.append(user_entry.rating)

    @tool
    def get_entries_from_last_x_days(days: int, email: str) -> list[SQLAlchemyEntry] | None:
        """Gets all the entries of the user within the last x days, and synthesizes the data to give relationship advise.

        Args:
            days (int): The amount of previous days to go back to pull entries from.
            email (str): The email of the user to grab entries from.
        """
        print("get_entries_from_last_x_days tool called!!!")
        date_from_x_days_ago: date = date.today() - timedelta(days=days)
        with PGClient.get_session() as session:
            queried_entries: list[SQLAlchemyEntry] | None = session.query(
                SQLAlchemyEntry).filter(SQLAlchemyEntry.date_selected >= date_from_x_days_ago).filter(SQLAlchemyEntry.email == email).limit(10).all()
        messages = [
            SystemMessage(
                content=f"""You are a relationship couselor. Synthesize the following 
                entries to derive insight for the user's relationship. {queried_entries.__str__()}"""
            )
        ]
        return self.llm.invoke(messages).content

    @tool
    def get_last_x_entries(amount: int, email: str) -> list[SQLAlchemyEntry]:
        """Gets the last x amount of most recent entries present and synthesizes the data to give relationship advise.

        Args:
            amount (int): The amount of most recent entries to pull from
            email (str): The email of the user to grab entries from.
        """
        print("get_last_x_entries tool called!!!")
        with PGClient.get_session() as session:
            queried_entries: list[SQLAlchemyEntry] | None = session.query(
                SQLAlchemyEntry).filter(SQLAlchemyEntry.email == email).order_by(SQLAlchemyEntry.date_selected.desc()).limit(amount).all()
        messages = [
            SystemMessage(
                content=f"""You are a relationship couselor. Synthesize the following 
                entries to derive insight for the user's relationship. {queried_entries.__str__()}"""
            )
        ]
        return self.llm.invoke(messages).content
