import sqlalchemy
import uuid
from db import Base
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from models.db.housekeep_db import HouseKeepDB
from models.schemas.housekeep_table import HouseKeepTableCreate


class HouseKeepTableDB(Base):
    __tablename__ = "housekeep_tables"
    id = sqlalchemy.Column(
        "id", sqlalchemy.dialects.postgresql.UUID(as_uuid=True), primary_key=True
    )
    housekeep_id = sqlalchemy.Column("housekeep_id", sqlalchemy.dialects.postgresql.UUID)
    name = sqlalchemy.Column("name", sqlalchemy.String)


def get_user_housekeep_tables(db: Session, user_id: str):
    return (
        db.query(HouseKeepTableDB)
        .join(HouseKeepDB, HouseKeepDB.id == HouseKeepTableDB.housekeep_id)
        .filter(HouseKeepDB.user_id == user_id)
        .all()
    )


def add_housekeep_table(db: Session, housekeep: HouseKeepTableCreate):
    id = str(uuid.uuid1())
    json_data = jsonable_encoder(housekeep)
    housekeep_obj = HouseKeepTableDB(**json_data, id=id)
    db.add(housekeep_obj)
    db.commit()
    db.refresh(housekeep_obj)
    return housekeep_obj
