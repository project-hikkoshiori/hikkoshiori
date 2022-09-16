from fastapi import Depends, HTTPException

from db import get_db
from sqlalchemy.orm import Session

from models.schemas.user import User, UserCreate

from models.db.user_db import get_user_by_name_db, post_user_db


class UserController:
    def __init__(self, app, logger):
        @app.get("/users/{name}", response_model=User)
        async def get_user(name, db: Session = Depends(get_db)):
            try:
                result = get_user_by_name_db(db, name)
            except Exception as e:
                logger.error(e)
                raise HTTPException(
                    status_code=404,
                    detail="[controller/user/get] error while getting user",
                )
            return result

        @app.post("/users", response_model=User)
        async def post_user(body: UserCreate, db: Session = Depends(get_db)):
            try:
                result = post_user_db(db, body)
            except Exception as e:
                logger.error(e)
                raise HTTPException(
                    status_code=404,
                    detail="[controller/user/post] error while adding user",
                )
            return result
