import datetime
import uuid
from typing import List

import sqlalchemy
from models.schemas.property import PropertyCreate
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


class PropertyImageDB(Base):
    __tablename__ = "property_images"
    id = sqlalchemy.Column("id", sqlalchemy.dialects.postgresql.UUID, primary_key=True)
    property_id = sqlalchemy.Column(
        "property_id", sqlalchemy.dialects.postgresql.UUID, sqlalchemy.ForeignKey("properties.id")
    )
    title = sqlalchemy.Column("title", sqlalchemy.String)
    image = sqlalchemy.Column("image", sqlalchemy.String)


def create_property_db(db: Session, property: PropertyCreate):
    id = str(uuid.uuid1())
    dt = datetime.datetime.now()
    db_property = PropertyDB(**property.dict(), id=id, fetched_at=dt)
    db.add(db_property)
    db.commit()
    db.refresh(db_property)
    return db_property


def create_property_images_db(db: Session, property_id: str, links: List[str]):
    for link in links:
        id = str(uuid.uuid1())
        image = PropertyImageDB(id=id, property_id=property_id, image=link)
        db.add(image)
    db.commit()
    return f"{len(links)} figures are added."


def get_property_images_db(db: Session, property_id: str):
    images = (
        db.query(PropertyImageDB.image).filter(PropertyImageDB.property_id == property_id).all()
    )
    return images
