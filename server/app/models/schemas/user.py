from uuid import UUID
from datetime import datetime

from pydantic import BaseModel


class UserBase(BaseModel):
    name: str
    gender: str
    user_type: str
    work_pattern: str


class UserCreate(UserBase):
    class Config:
        orm_mode = True


class User(UserBase):
    id: UUID
    created_at: datetime

    class Config:
        orm_mode = True
