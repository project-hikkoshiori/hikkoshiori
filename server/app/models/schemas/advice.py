from pydantic import BaseModel

from uuid import UUID
from datetime import datetime


class AdviceBase(BaseModel):
    user_id: UUID
    content: str
    icon_src: str


class Advice(AdviceBase):
    id: UUID
    created_at: datetime

    class Config:
        orm_mode = True


class AdviceCreate(AdviceBase):
    class Config:
        orm_mode = True
