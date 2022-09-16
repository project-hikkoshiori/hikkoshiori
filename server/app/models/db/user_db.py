import sqlalchemy
from db import Base
from sqlalchemy.orm import Session


class UserDB(Base):
    __tablename__ = "users"
    id = sqlalchemy.Column("id", sqlalchemy.dialects.postgresql.UUID, primary_key=True)
    name = sqlalchemy.Column("name", sqlalchemy.String)
    email = sqlalchemy.Column("email", sqlalchemy.String)
    layout_path = sqlalchemy.Column("layout_path", sqlalchemy.String)
    model_path = sqlalchemy.Column("model_path", sqlalchemy.String)


def get_user_by_name_db(db: Session, name: str):
    return db.query(UserDB).filter(UserDB.name == name).first()

def add_layout_by_name_db(db: Session, name: str, layout_path: str)
