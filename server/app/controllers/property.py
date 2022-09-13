from db import get_db
from fastapi import Depends
from models.db.property_db import create_property_db
from models.schemas.property import Property, PropertyCreate
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
