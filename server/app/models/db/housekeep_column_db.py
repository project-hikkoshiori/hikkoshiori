from typing import List
import sqlalchemy
import uuid
from db import Base
from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session
from models.db.housekeep_db import HouseKeepDB
from models.db.housekeep_table_db import HouseKeepTableDB
from models.schemas.housekeep_column import HouseKeepColumnCreate, HouseKeepColumn


class HouseKeepColumnDB(Base):
    __tablename__ = "housekeep_columns"
    id = sqlalchemy.Column("id", sqlalchemy.dialects.postgresql.UUID(as_uuid=True), primary_key=True)
    table_id = sqlalchemy.Column("table_id", sqlalchemy.dialects.postgresql.UUID)
    name = sqlalchemy.Column("name", sqlalchemy.String)
    value = sqlalchemy.Column("value", sqlalchemy.Numeric)
    is_prepared = sqlalchemy.Column("is_prepared", sqlalchemy.Boolean)

def get_user_housekeep_columns(db: Session, user_id: str):
    return db.query(HouseKeepColumnDB.id,\
            HouseKeepColumnDB.table_id,\
            HouseKeepColumnDB.name,\
            HouseKeepColumnDB.value,\
            HouseKeepColumnDB.is_prepared,\
            HouseKeepTableDB.name.label("table_name"))\
        .join(HouseKeepTableDB, HouseKeepTableDB.id == HouseKeepColumnDB.table_id)\
        .join(HouseKeepDB, HouseKeepDB.id == HouseKeepTableDB.housekeep_id)\
        .filter(HouseKeepDB.user_id == user_id)\
        .all()

def add_housekeep_column(db: Session, housekeep: HouseKeepColumnCreate, user_id: str):
    # table exist check
    table = db.query(HouseKeepTableDB)\
        .join(HouseKeepDB, HouseKeepDB.id == HouseKeepTableDB.housekeep_id)\
        .filter(HouseKeepDB.user_id == user_id, HouseKeepTableDB.id == housekeep.table_id)
    if db.query(table.exists()).scalar() == None:
        msg = "the table_id is wrong. this is not your table."
    else:
        # add
        id = str(uuid.uuid1())
        json_data = jsonable_encoder(housekeep)
        housekeep_column_obj = HouseKeepColumnDB(**json_data, id=id)
        db.add(housekeep_column_obj)
        db.commit()
        db.refresh(housekeep_column_obj)
        msg = "housekeep_column added successfully"
    return msg

def delete_housekeep_column(db: Session, housekeep: HouseKeepColumn, user_id: str):
    # table exist check
    table = db.query(HouseKeepTableDB)\
        .join(HouseKeepDB, HouseKeepDB.id == HouseKeepTableDB.housekeep_id)\
        .filter(HouseKeepDB.user_id == user_id, HouseKeepTableDB.id == housekeep.table_id)
    if db.query(table.exists()).scalar() == None:
        msg = "the table_id is wrong. this is not your table."
    else:
        db.query(HouseKeepColumnDB).filter(HouseKeepColumnDB.id == housekeep.id).delete()
        db.commit()
        msg = "housekeep_column deleted successfully"
    return msg
