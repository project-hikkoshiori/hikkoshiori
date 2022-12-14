import string
import sqlalchemy
import uuid
import datetime
from db import Base
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from models.schemas.advice import AdviceCreate
from models.db.user_db import UserDB


class AdviceDB(Base):
    __tablename__ = "advices"
    id = sqlalchemy.Column("id", sqlalchemy.dialects.postgresql.UUID, primary_key=True)
    user_id = sqlalchemy.Column("user_id", sqlalchemy.dialects.postgresql.UUID)
    content = sqlalchemy.Column("content", sqlalchemy.String)
    created_at = sqlalchemy.Column("created_at", sqlalchemy.DateTime)
    icon_src = sqlalchemy.Column("icon_src", sqlalchemy.String)


def get_advices_db(db: Session):
    return db.query(AdviceDB).all()


def get_filtered_advices_db(
    db: Session, gender: str, user_type: str, work_pattern: str, free_ford: str
):
    result = (
        db.query(
            AdviceDB,
            AdviceDB.id,
            AdviceDB.user_id,
            AdviceDB.content,
            AdviceDB.created_at,
            AdviceDB.icon_src,
            UserDB.gender,
            UserDB.user_type,
            UserDB.work_pattern,
        )
        .join(AdviceDB, AdviceDB.user_id == UserDB.id)
        .filter(UserDB.gender == gender if gender else True)
        .filter(UserDB.user_type == user_type if user_type else True)
        .filter(UserDB.work_pattern == work_pattern if work_pattern else True)
        .filter(AdviceDB.content.like(f"%{free_ford}%") if free_ford else True)
        .all()
    )
    return result


def get_advice_db(advice_id: string, db: Session):
    return db.query(AdviceDB).filter(AdviceDB.id == advice_id).one()


def add_advices_db(db: Session, advice: AdviceCreate):
    id = str(uuid.uuid1())
    dt = datetime.datetime.now()
    json_data = jsonable_encoder(advice)
    advice_obj = AdviceDB(**json_data, id=id, created_at=dt)
    db.add(advice_obj)
    db.commit()
    db.refresh(advice_obj)
    return advice_obj
