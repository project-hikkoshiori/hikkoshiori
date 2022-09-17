from typing import List

from db import get_db
from fastapi import Depends, HTTPException
from models.db.bookmark_db import add_user_bookmark, get_user_bookmark, remove_user_bookmark
from models.db.property_db import create_property_db, get_filtered_properties_db
from models.schemas.bookmark import BookmarkRequest
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

        @app.get("/property/get", response_model=List[BookmarkedProperty])
        async def get_user_properties(user_id: str, db: Session = Depends((get_db))):
            try:
                result = get_user_bookmark(db, user_id)
            except Exception as e:
                logger.error(e)
                raise HTTPException(
                    status_code=404, detail=f"cannot fetch properties of user {user_id}"
                )

            return result

        @app.get("/property/filter", response_model=List[Property])
        async def get_filtered_properties(
            direction: str = None,
            least_two_floor: bool = None,
            initial_cost_zero: bool = None,
            db: Session = Depends((get_db)),
        ):
            try:
                result = get_filtered_properties_db(
                    db, direction, least_two_floor, initial_cost_zero
                )
            except Exception as e:
                logger.error(e)
                raise HTTPException(status_code=404, detail="cannot fetch filtered properties")
            return result

        @app.post("/bookmark/add")
        async def register_user_bookmark(request: BookmarkRequest, db: Session = Depends(get_db)):
            result = add_user_bookmark(db, request)
            return {"msg": result}

        @app.delete("/bookmark/delete")
        async def delete_user_bookmark(request: BookmarkRequest, db: Session = Depends(get_db)):
            result = remove_user_bookmark(db, request)
            return {"msg": result}
