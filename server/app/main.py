from typing import Union
import os

from sqlalchemy import create_engine
from setup import app, logger
from env import DB_PATH


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/db_test")  # dbのテスト用
def hello_db():
    logger.info(DB_PATH)
    try:
        db = create_engine(DB_PATH)
        conn = db.connect()
    except Exception as err:
        logger.error(err)
    else:
        logger.info("db connected......")
    return {"message": "db connected. This is test."}
