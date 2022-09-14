import sqlalchemy
from db import Base
from sqlalchemy.orm import Session


class AuthDB(Base):
    __tablename__ = "auths"
    name = sqlalchemy.Column("name", sqlalchemy.String, primary_key=True)
    password = sqlalchemy.Column("password", sqlalchemy.String)


def get_auth_by_name_db(db: Session, name: str):
    return db.query(AuthDB).filter(AuthDB.name == name).first()
