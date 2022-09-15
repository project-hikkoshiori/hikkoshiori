from typing import List

from db import get_db
from fastapi import Depends, HTTPException
from models.db.bookmark_db import get_user_bookmark, link_user_bookmark
from models.db.property_db import create_property_db
from models.schemas.bookmark import BookmarkDownloadRequest, BookmarkRequest
from models.schemas.property import BookmarkedProperty, Property, PropertyCreate
from sqlalchemy.orm import Session

from controllers.property_collector import download


class PropertyController:
    def __init__(self, app, logger):
        @app.post("/property/fetchPropertyFromURL", response_model=Property)
        async def fetch_property_from_url_and_add_to_db(url: str, db: Session = Depends(get_db)):
            parser = download(url)
            property = PropertyCreate(**parser.dict())
            result = create_property_db(db, property)
            return result

        @app.get("/property/getProperties", response_model=List[BookmarkedProperty])
        async def get_user_properties(user_id: str, db: Session = Depends((get_db))):
            try:
                result = get_user_bookmark(db, user_id)
            except Exception as e:
                logger.error(e)
                raise HTTPException(
                    status_code=404, detail=f"cannot fetch properties of user {user_id}"
                )
            return result

        @app.post("/property/addBookmarks", response_model=List[BookmarkedProperty])
        async def add_user_bookmark(request: BookmarkRequest, db: Session = Depends(get_db)):
            pass

        @app.post("/property/removeBookmark", response_model=List[BookmarkedProperty])
        async def add_user_bookmark(request: BookmarkRequest, db: Session = Depends(get_db)):
            pass
