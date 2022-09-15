from typing import List
from uuid import UUID

from pydantic import BaseModel


class Bookmark(BaseModel):
    bookmark_id: UUID
    user_id: UUID
    property_id: UUID
    is_bookmarked: bool

    class Config:
        orm_mode = True


class BookmarkRequest(BaseModel):
    user_id: UUID
    property_ids: List[UUID]
