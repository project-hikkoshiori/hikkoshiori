import datetime
import uuid
from typing import Dict

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
    image_src = sqlalchemy.Column("image_src", sqlalchemy.String)


class PropertyImageDB(Base):
    __tablename__ = "property_images"
    id = sqlalchemy.Column("id", sqlalchemy.dialects.postgresql.UUID, primary_key=True)
    property_id = sqlalchemy.Column(
        "property_id", sqlalchemy.dialects.postgresql.UUID, sqlalchemy.ForeignKey("properties.id")
    )
    title = sqlalchemy.Column("title", sqlalchemy.String)
    image_link = sqlalchemy.Column("image", sqlalchemy.String)


def create_property_db(db: Session, property: PropertyCreate):
    id = str(uuid.uuid1())
    dt = datetime.datetime.now()
    db_property = PropertyDB(**property.dict(), id=id, fetched_at=dt)
    db.add(db_property)
    db.commit()
    db.refresh(db_property)
    return db_property


def get_filtered_properties_db(
    db: Session, direction: str, least_two_floor: bool, initial_cost_zero: bool
):
    direction_dict = {
        "north": "北",
        "south": "南",
        "east": "東",
        "west": "西",
        "northeast": "北東",
        "northwest": "北西",
        "southeast": "南東",
        "southwest": "南西",
    }
    result = (
        db.query(PropertyDB)
        .filter(PropertyDB.direction == direction_dict[direction] if direction else True)
        .filter(PropertyDB.floor_num >= 1 if least_two_floor else True)
        .filter(PropertyDB.initial_cost == 0 if initial_cost_zero else True)
        .all()
    )
    return result


def create_property_images_db(db: Session, property_id: str, links: Dict[str, str]):
    for name, link in links.items():
        id = str(uuid.uuid1())
        image = PropertyImageDB(id=id, title=name, property_id=property_id, image_link=link)
        db.add(image)
    db.commit()
    return f"{len(links)} figures are added."


def get_property_images_db(db: Session, property_id: str):
    images = (
        db.query(PropertyImageDB.title, PropertyImageDB.image_link)
        .filter(PropertyImageDB.property_id == property_id)
        .all()
    )
    return images
