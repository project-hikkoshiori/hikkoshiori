from typing import List
import string
import sqlalchemy
import uuid
from db import Base
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from models.schemas.housekeep import HouseKeepCreate


class HouseKeepDB(Base):
    __tablename__ = "housekeeps"
    id = sqlalchemy.Column("id", sqlalchemy.dialects.postgresql.UUID, primary_key=True)
    user_id = sqlalchemy.Column("user_id", sqlalchemy.dialects.postgresql.UUID)

def get_user_housekeeps(db: Session, user_id: str):
    return db.query(HouseKeepDB).filter(HouseKeepDB.user_id == user_id).all()

def add_user_housekeep(db: Session, user_id: str):
    id = str(uuid.uuid1())
    housekeep_obj = HouseKeepDB(id=id, user_id=user_id)
    db.add(housekeep_obj)
    db.commit()
    db.refresh(housekeep_obj)
    return housekeep_obj
