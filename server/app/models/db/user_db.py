import sqlalchemy
import uuid
import datetime
from db import Base
from sqlalchemy.orm import Session
from fastapi.encoders import jsonable_encoder

from models.schemas.user import UserCreate


class UserDB(Base):
    __tablename__ = "users"
    id = sqlalchemy.Column("id", sqlalchemy.dialects.postgresql.UUID, primary_key=True)
    name = sqlalchemy.Column("name", sqlalchemy.String)
    gender = sqlalchemy.Column("gender", sqlalchemy.String)
    user_type = sqlalchemy.Column("user_type", sqlalchemy.String)
    work_pattern = sqlalchemy.Column("work_pattern", sqlalchemy.String)
    created_at = sqlalchemy.Column("created_at", sqlalchemy.DateTime)


def get_user_by_name_db(db: Session, name: str):
    return db.query(UserDB).filter(UserDB.name == name).one()


def post_user_db(db: Session, user: UserCreate):
    id = str(uuid.uuid1())
    dt = datetime.datetime.now()
    json_data = jsonable_encoder(user)
    user_obj = UserDB(**json_data, id=id, created_at=dt)
    db.add(user_obj)
    db.commit()
    db.refresh(user_obj)
    return user_obj
