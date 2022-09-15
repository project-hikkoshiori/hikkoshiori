import uuid

import sqlalchemy
from models.db.property_db import PropertyDB
from models.schemas.bookmark import BookmarkRequest
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
        )
        .join(PropertyDB, PropertyDB.id == BookmarkDB.property_id)
        .filter(BookmarkDB.user_id == user_id)
    ).all()
    return bookmarked_properties


def add_user_bookmark(db: Session, request: BookmarkRequest):
    bookmark = db.query(BookmarkDB).filter(
        BookmarkDB.user_id == str(request.user_id),
        BookmarkDB.property_id == str(request.property_id),
    )
    if db.query(bookmark.exists()).scalar():
        msg = "The user already has the bookmark. Nothing to do."
    else:
        bookmark = BookmarkDB(
            bookmark_id=str(uuid.uuid1()),
            user_id=str(request.user_id),
            property_id=str(request.property_id),
        )
        db.merge(bookmark)
        db.commit()
        msg = "Bookmark added successfully"
    return msg


def remove_user_bookmark(db: Session, request: BookmarkRequest):

    bookmark = db.query(BookmarkDB).filter(
        BookmarkDB.user_id == str(request.user_id),
        BookmarkDB.property_id == str(request.property_id),
    )
    if db.query(bookmark.exists()).scalar():
        db.delete(bookmark.first())
        db.commit()
        msg = "Bookmark deleted successfully"
    else:
        msg = "The bookmark does not exists. Nothing to do."

    return msg
