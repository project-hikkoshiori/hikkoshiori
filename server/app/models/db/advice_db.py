import sqlalchemy
import uuid
import datetime
from db import Base
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from models.schemas.advice import AdviceCreate


class AdviceDB(Base):
    __tablename__ = "advices"
    id = sqlalchemy.Column("id", sqlalchemy.dialects.postgresql.UUID, primary_key=True)
    user_id = sqlalchemy.Column("user_id", sqlalchemy.dialects.postgresql.UUID)
    content = sqlalchemy.Column("content", sqlalchemy.String)
    created_at = sqlalchemy.Column("created_at", sqlalchemy.DateTime)
    icon_src = sqlalchemy.Column("icon_src", sqlalchemy.String)


def get_advices_db(db: Session):
    return db.query(AdviceDB).all()


def add_advices_db(db: Session, advice: AdviceCreate):
    id = str(uuid.uuid1())
    dt = datetime.datetime.now()
    json_data = jsonable_encoder(advice)
    advice_obj = AdviceDB(**json_data, id=id, created_at=dt)
    db.add(advice_obj)
    db.commit()
    db.refresh(advice_obj)
    return advice_obj
