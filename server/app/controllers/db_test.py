from env import DB_PATH
from sqlalchemy import create_engine


class DBTestController:
    def __init__(self, app, logger):
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
