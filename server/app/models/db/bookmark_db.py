import sqlalchemy

from db import Base


class BookmarkDB(Base):
    __tablename__ = "bookmark"
    id = sqlalchemy.Column("id", sqlalchemy.dialects.postgresql.UUID, primary_key=True)
    user_id = sqlalchemy.Column("user_id", sqlalchemy.dialects.postgresql.UUID)
    property_id = sqlalchemy.Column("property_id", sqlalchemy.dialects.postgresql.UUID)
