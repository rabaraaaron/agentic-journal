from typing import Optional
from datetime import date, datetime
import zoneinfo
from pydantic import BaseModel, Field

from models.moods import Mood


class User(BaseModel):
    email: str = Field(min_length=5, max_length=30)
    password: str = Field(min_length=5, max_length=20)
    username: str = Optional[str]


class Entry(BaseModel):
    datetime_last_modified: datetime = Field(
        default=datetime.now(zoneinfo.ZoneInfo('America/New_York')))
    date_selected: date = Field(
        default=date.today())
    message: str = Field(min_length=1, max_length=300, default="")
    moods: list[Mood] = Field(default_factory=list)
    email: str = Field(min_length=1, max_length=30)


class LLMRequest(BaseModel):
    prompt: str = Field(min_length=1, max_length=150, default="No input")
