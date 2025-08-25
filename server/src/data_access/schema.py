from datetime import datetime
import zoneinfo
from sqlalchemy import ARRAY, DateTime, Integer, String, ForeignKey, Date
from sqlalchemy.orm import DeclarativeBase, mapped_column
from sqlalchemy.ext.mutable import MutableList


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = 'users'
    email = mapped_column(String, primary_key=True)
    password = mapped_column(String)
    username = mapped_column(String)
    discord_webhook_url = mapped_column(String)


class Entry(Base):
    __tablename__ = 'entries'
    id = mapped_column(Integer, primary_key=True)
    datetime_last_modified = mapped_column(
        DateTime, default=datetime.now(zoneinfo.ZoneInfo('America/New_York')))
    date_selected = mapped_column(Date)
    messages = mapped_column(
        MutableList.as_mutable(ARRAY(String)), default=list)
    moods = mapped_column(MutableList.as_mutable(ARRAY(String)), default=list)
    ratings = mapped_column(MutableList.as_mutable(ARRAY(Integer)))
    email = mapped_column(ForeignKey('users.email'))
