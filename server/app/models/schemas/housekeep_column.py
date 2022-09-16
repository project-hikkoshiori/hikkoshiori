from pydantic import BaseModel

from uuid import UUID

from models.schemas.housekeep_table import HouseKeepTable


class HouseKeepColumnBase(BaseModel):
    table_id: UUID
    name: str
    value: int
    is_prepared: bool

class HouseKeepColumn(HouseKeepColumnBase):
    id: UUID
    class Config:
        orm_mode = True

class HouseKeepColumnResponse(HouseKeepColumn):
    table_name: str
    class Config:
        orm_mode = True

class HouseKeepColumnCreate(HouseKeepColumnBase):
    class Config:
        orm_mode = True
