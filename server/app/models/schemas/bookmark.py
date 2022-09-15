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

    class Config:
        schema_extra = {
            "example": {
                "user_id": "81f981b2-bdfa-4b98-b1a3-b4669f948a12",
                "property_ids": [
                    "2735556c-32cf-11ed-9ef9-acde48001122",
                    "964a1fbe-32d4-11ed-80aa-acde48001122",
                ],
            }
        }
