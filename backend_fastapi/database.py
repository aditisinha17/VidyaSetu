"""
VidyaSetu Database Engine Configuration
Supports SQLite for zero-setup local demonstration and PostgreSQL for production.
"""

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker

# Database URL: default to SQLite file in workspace, or override via env var
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./backend_fastapi/vidyasetu.db")

# SQLite needs connect_args={"check_same_thread": False}
connect_args = {"check_same_thread": False} if DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    echo=False
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """FastAPI dependency that provides a transactional database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
