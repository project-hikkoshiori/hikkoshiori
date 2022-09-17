from pydantic import BaseModel

from uuid import UUID


class HouseKeepTableBase(BaseModel):
    housekeep_id: UUID
    name: str


class HouseKeepTable(HouseKeepTableBase):
    id: UUID

    class Config:
        orm_mode = True


class HouseKeepTableCreate(HouseKeepTableBase):
    class Config:
        orm_mode = True
