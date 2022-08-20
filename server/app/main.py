from typing import Union
import os
import logging

from sqlalchemy import create_engine
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# ログ仕込む
logger = logging.getLogger("uvicorn")
logger.setLevel(logging.DEBUG)
logger.info("start application......")

# 環境変数展開(模索中)
POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_DB_NAME = os.getenv("POSTGRES_DB_NAME")
POSTGRES_PORT = os.getenv("POSTGRES_PORT")
HOST = os.getenv("HOST")

# middleware設定
origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/db_test")  # dbのテスト用
def hello_db():
    db_path = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{HOST}:{POSTGRES_PORT}/{POSTGRES_DB_NAME}"
    logger.info(db_path)
    try:
        db = create_engine(db_path)
        conn = db.connect()
    except Exception as err:
        logger.error(err)
    else:
        logger.info("db connected......")
    return {"message": "db connected. This is test."}
