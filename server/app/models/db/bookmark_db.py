import uuid

import sqlalchemy
from fastapi.encoders import jsonable_encoder
from models.db.property_db import PropertyDB
from models.schemas.bookmark import Bookmark, BookmarkRequest
from sqlalchemy.orm import Session

from db import Base


class BookmarkDB(Base):
    __tablename__ = "bookmarks"
    bookmark_id = sqlalchemy.Column(
        "bookmark_id", sqlalchemy.dialects.postgresql.UUID, primary_key=True
    )
    user_id = sqlalchemy.Column(
        "user_id", sqlalchemy.dialects.postgresql.UUID, sqlalchemy.ForeignKey("users.id")
    )
    property_id = sqlalchemy.Column(
        "property_id", sqlalchemy.dialects.postgresql.UUID, sqlalchemy.ForeignKey("properties.id")
    )
    is_bookmarked = sqlalchemy.Column("is_bookmarked", sqlalchemy.Boolean)


def get_user_bookmark(db: Session, user_id: str):
    # select * from properties inner join bookmark on properties.id == bookmark.property_id

    bookmarked_properties = (
        db.query(
            PropertyDB,
            PropertyDB.id,
            PropertyDB.monthly_rent_price,
            PropertyDB.monthly_maintenance_fee,
            PropertyDB.initial_cost,
            PropertyDB.location,
            PropertyDB.distance_station_raw,
            PropertyDB.house_layout,
            PropertyDB.exclusive_area,
            PropertyDB.age_of_building,
            PropertyDB.floor_num,
            PropertyDB.direction,
            PropertyDB.additional_info,
            PropertyDB.fetched_at,
            BookmarkDB.bookmark_id,
            BookmarkDB.user_id,
            BookmarkDB.is_bookmarked,
        )
        .join(PropertyDB, PropertyDB.id == BookmarkDB.property_id)
        .filter(BookmarkDB.user_id == user_id)
    ).all()
    return bookmarked_properties


def add_user_bookmark(db: Session, request: BookmarkRequest):
    bookmark = db.query(BookmarkDB).filter(BookmarkDB.property_id == str(request.property_id))
    if db.query(bookmark.exists()).scalar():
        bookmark.is_bookmarked = True

    else:
        bookmark = BookmarkDB(
            bookmark_id=str(uuid.uuid1()),
            user_id=str(request.user_id),
            property_id=str(request.property_id),
            is_bookmarked=True,
        )
        db.add(bookmark)
    db.commit()
    db.refresh(bookmark)
    return "sucess add bookmark"


def remove_user_bookmark(db: Session, request: BookmarkRequest):
    bookmark = db.query(BookmarkDB).filter(BookmarkDB.property_id == str(request.property_id))
    if db.query(bookmark.exists()).scalar():
        bookmark.is_bookmarked = False

    else:
        bookmark = BookmarkDB(
            bookmark_id=str(uuid.uuid1()),
            user_id=str(request.user_id),
            property_id=str(request.property_id),
            is_bookmarked=False,
        )
        db.add(bookmark)
    db.commit()
    db.refresh(bookmark)
    return "sucess remove bookmark"
