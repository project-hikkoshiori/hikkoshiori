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

def add_user_housekeep(db: Session, housekeep: HouseKeepCreate):
    id = str(uuid.uuid1())
    json_data = jsonable_encoder(housekeep)
    housekeep_obj = HouseKeepDB(**json_data, id=id)
    db.add(housekeep_obj)
    db.commit()
    db.refresh(housekeep_obj)
    return housekeep_obj

def add_user_housekeeps(db: Session, housekeeps: List[HouseKeepCreate]):
    housekeeps_obj = [HouseKeepDB(**jsonable_encoder(housekeep), id=str(uuid.uuid1()))
        for housekeep in housekeeps]
    db.bulk_save_objects(housekeeps_obj, return_defaults=True)
    db.commit()
    return housekeeps_obj
