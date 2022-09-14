from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import Depends, HTTPException

from db import get_db
from sqlalchemy.orm import Session

from models.db.user_db import get_user_by_name_db


class UserController:
    def __init__(self, app, logger):
        @app.post("/token")
        async def login(
            form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
        ):
            user = get_user_by_name_db(db, form.username)
            if not user:
                raise HTTPException(status=400, detail="incorrect username or password")
            if form.password != user.password:
                raise HTTPException(status=400, detail="incorrect username or password")
            return {"access_token": user.name, "token_type": "bearer"}
