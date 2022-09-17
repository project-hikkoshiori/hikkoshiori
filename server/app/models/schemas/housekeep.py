from pydantic import BaseModel

from uuid import UUID


class HouseKeepBase(BaseModel):
    user_id: UUID


class HouseKeep(HouseKeepBase):
    id: UUID

    class Config:
        orm_mode = True


class HouseKeepCreate(HouseKeepBase):
    class Config:
        orm_mode = True
