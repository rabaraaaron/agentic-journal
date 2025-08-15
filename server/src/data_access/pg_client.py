import os

from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session
from contextlib import contextmanager
from typing import Generator

user = os.getenv('POSTGRES_USER', 'default_value')
password = os.getenv('POSTGRES_PASSWORD', 'default')
db = os.getenv('POSTGRES_DB', 'default')
url = os.getenv('POSTGRES_URL', 'default')
port = os.getenv('POSTGRES_PORT', 5432)

CONN_STRING = f"postgresql://{user}:{password}@{url}:{port}/{db}"

engine = create_engine(
    url=CONN_STRING,
    pool_size=5,                    # Number of connections to maintain
    max_overflow=10,                # Additional connections beyond pool_size
    pool_pre_ping=True,             # Validate connections before use
    pool_recycle=3600               # Recycle connections after 1 hour
)

session_local = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)


class PGClient:
    """Factory for database sessions - not a singleton"""

    @staticmethod
    @contextmanager
    def get_session() -> Generator[Session, None, None]:
        """Creates a new session for each operation"""
        session = session_local()
        try:
            yield session
            session.commit()
        except Exception:
            session.rollback()
            raise
        finally:
            session.close()
