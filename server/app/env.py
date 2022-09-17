import os

DB_PATH = os.getenv("DATABASE_URL")
if DB_PATH.startswith("postgres://"):
    DB_PATH = DB_PATH.replace("postgres://", "postgresql://", 1)
