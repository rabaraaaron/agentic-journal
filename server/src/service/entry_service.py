from datetime import datetime, timedelta, date
import zoneinfo
from langchain_core.tools import tool

from models.models import Entry as PydanticEntry
from data_access.schema import Entry as SQLAlchemyEntry
from sqlalchemy.orm import Session
from data_access.pg_client import PGClient

from models.models import Mood


class EntryService:

    def add_or_update_entry(self, user_entry: PydanticEntry) -> None:
        with PGClient.get_session() as session:
            queried_entry: SQLAlchemyEntry | None = session.query(
                SQLAlchemyEntry).filter(SQLAlchemyEntry.date_selected == user_entry.date_selected and SQLAlchemyEntry.email == user_entry.email).first()
            if queried_entry:
                return self.update_entry(user_entry=user_entry, queried_entry=queried_entry)
            self.add_entry(user_entry=user_entry, session=session)

        # Conduct agentic check on whether or not Melissa needs to get texted or not
        # Langgraph, Ollama, etc

    def add_entry(self, user_entry: PydanticEntry, session: Session) -> None:
        new_entry = SQLAlchemyEntry(
            date_selected=user_entry.date_selected,
            messages=[user_entry.message],
            moods=[
                Mood(mood).value for mood in user_entry.moods if Mood(mood)
            ],
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

    # @tool
    def get_entries_from_last_x_days(self, days: int):
        """Gets the entries within the last x days, if there were any."""
        date_from_x_days_ago: date = date.today() - timedelta(days=days)
        with PGClient.get_session() as session:
            queried_entries: list[SQLAlchemyEntry] | None = session.query(
                SQLAlchemyEntry).filter(SQLAlchemyEntry.date_selected >= date_from_x_days_ago).filter(SQLAlchemyEntry.email == "rabara777@outlook.com").all()
            return queried_entries

    # @tool
    def get_last_x_entries(self, amount: int):
        """Gets the last x amount of entries present, no matter the date"""
        with PGClient.get_session() as session:
            queried_entries: list[SQLAlchemyEntry] | None = session.query(
                SQLAlchemyEntry).order_by(SQLAlchemyEntry.date_selected.desc()).limit(amount).all()
            return queried_entries
