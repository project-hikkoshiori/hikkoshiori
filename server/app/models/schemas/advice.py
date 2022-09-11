from pydantic import BaseModel

from uuid import UUID
from datetime import datetime


class Advice(BaseModel):
    id: UUID
    user_id: UUID
    content: str
    created_at: datetime
    icon_src: str

    class Config:
        orm_mode = True
