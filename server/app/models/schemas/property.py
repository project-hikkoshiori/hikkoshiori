from datetime import datetime
from typing import Optional
from uuid import UUID

from pydantic import BaseModel


class PropertyBase(BaseModel):
    monthly_rent_price: int
    monthly_maintenance_fee: int
    initial_cost: int
    location: str
    distance_station_raw: str
    house_layout: str
    exclusive_area: float
    age_of_building: int
    floor_num: int
    direction: str
    additional_info: dict
    image_src: Optional[str]


class PropertyCreate(PropertyBase):
    pass


class Property(PropertyBase):
    id: UUID
    monthly_rent_price: int
    monthly_maintenance_fee: int
    initial_cost: int
    location: str
    distance_station_raw: str
    house_layout: str
    exclusive_area: float
    age_of_building: int
    floor_num: int
    direction: str
    additional_info: dict
    fetched_at: datetime

    class Config:
        orm_mode = True


class BookmarkedProperty(Property):
    bookmark_id: UUID
    user_id: str


class PropertyImage(BaseModel):
    title: str
    image_link: str
