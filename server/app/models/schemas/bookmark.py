from uuid import UUID

from pydantic import BaseModel


class Bookmark(BaseModel):
    id: UUID
    user_id: UUID
    property_id: UUID
    is_bookmarked: bool

    class Config:
        orm_mode = True
