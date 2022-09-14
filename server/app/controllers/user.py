from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi import Depends, HTTPException
from jose import jwt, JWTError
from datetime import timedelta, datetime

from db import get_db
from sqlalchemy.orm import Session

from models.db.user_db import get_user_by_name_db
from models.schemas.user import User
from models.schemas.token import Token

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


class UserController:
    def __init__(self, app, logger):
        # ログイン周りで使う変数
        self.SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
        self.ALGORITHM = "HS256"
        self.ACCESS_TOKEN_EXPIRE_MINUTES = 30  # トークンの保持期間(min)

        @app.post("/token", response_model=Token)
        async def login(
            form: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)
        ):
            user = get_user_by_name_db(db, form.username)
            if not user:
                raise HTTPException(status_code=400, detail="incorrect username or password")
            if form.password != user.password:  # TODO: hash
                raise HTTPException(status_code=400, detail="incorrect username or password")
            access_token = self.create_access_token(data={"sub": user.name})
            return {"access_token": access_token, "token_type": "bearer"}

        @app.get("/users/me", response_model=User)
        async def read_users_me(current_user: User = Depends(self.get_current_user)):
            return current_user

    def create_access_token(self, data: dict):
        to_encode = data.copy()
        expire = datetime.utcnow() + timedelta(minutes=self.ACCESS_TOKEN_EXPIRE_MINUTES)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, self.SECRET_KEY, algorithm=self.ALGORITHM)
        return encoded_jwt

    def get_current_user(self, token: str = Depends(oauth2_scheme), db: Session = Depends(get_db)):
        credentials_exception = HTTPException(
            status_code=401,
            detail="invalid authentication credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
        try:
            payload = jwt.decode(token, self.SECRET_KEY, algorithms=[self.ALGORITHM])
            username: str = payload.get("sub")
            if username is None:
                raise credentials_exception
        except JWTError:
            raise credentials_exception
        user = get_user_by_name_db(db, username)
        if not user:
            raise credentials_exception
        return user
