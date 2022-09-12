from re import S
from sqlite3 import SQLITE_SAVEPOINT

import sqlalchemy
from sqlalchemy.orm import Session

from db import Base


class PropertyDB(Base):
    __tablename__ = "properties"
    id = sqlalchemy.Column("id", sqlalchemy.dialects.postgresql.UUID, primary_key=True)
    monthly_rent_price = sqlalchemy.Column("monthly_rent_price", sqlalchemy.Integer)
    monthly_maintenance_fee = sqlalchemy.Column("monthly_maintenance_fee", sqlalchemy.Integer)
    initial_cost = sqlalchemy.Column("initial_cost", sqlalchemy.Integer)
    location = sqlalchemy.Column("location", sqlalchemy.String)
    distance_station_raw = sqlalchemy.Column("distance_station_raw", sqlalchemy.String)
    house_layout = sqlalchemy.Column("house_layout", sqlalchemy.String)
    exclusive_area = sqlalchemy.Column("exclusive_area", sqlalchemy.Float)
    age_of_building = sqlalchemy.Column("age_of_building", sqlalchemy.Integer)
    floor_num = sqlalchemy.Column("floor_num", sqlalchemy.Integer)
    direction = sqlalchemy.Column("direction", sqlalchemy.String)
    additional_info = sqlalchemy.Column("additional_info", sqlalchemy.dialects.postgresql.JSONB)
    fetched_at = sqlalchemy.Column("fetched_at", sqlalchemy.DateTime)
