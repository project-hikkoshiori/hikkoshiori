import sqlalchemy
from db import Base
from sqlalchemy.orm import Session


class UserDB(Base):
    __tablename__ = "users"
    id = sqlalchemy.Column("id", sqlalchemy.dialects.postgresql.UUID, primary_key=True)
    name = sqlalchemy.Column("name", sqlalchemy.String)
    email = sqlalchemy.Column("email", sqlalchemy.String)
    password = sqlalchemy.Column("password", sqlalchemy.String)


def get_user_by_name_db(db: Session, name: str):
    return db.query(UserDB).filter(UserDB.name == name).first()
