from fastapi import Depends, HTTPException
from typing import List
import urllib.parse


from db import get_db
from sqlalchemy.orm import Session

from models.schemas.user import User, UserCreate

from models.db.user_db import post_user_db, get_user_by_name_db


class UserController:
    def __init__(self, app, logger):
        @app.get("/users/me", response_model=User)
        async def get_user_by_name(name: str, db: Session = Depends(get_db)):
            parsed_name = urllib.parse.unquote(name)
            print(parsed_name)
            try:
                result = get_user_by_name_db(db, parsed_name)
            except Exception as e:
                raise HTTPException(
                    status_code=404,
                    detail="[controller/user/get/me] error while getting user",
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
