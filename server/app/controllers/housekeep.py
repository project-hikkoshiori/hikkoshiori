from typing import List

from fastapi import Depends, HTTPException

from db import get_db
from sqlalchemy.orm import Session

from models.schemas.housekeep import HouseKeep
from models.db.housekeep_db import get_user_housekeeps
class HouseKeepController:
    def __init__(self, app, logger):
        @app.get("/housekeeps/{user_id}", response_model=List[HouseKeep])
        async def get_housekeeps(user_id: str, db: Session = Depends(get_db)):
            try:
                result = get_user_housekeeps(db, user_id)
            except Exception as e:
                logger.error(e)
                raise HTTPException(
                    status_code=404,
                    detail="[controller/advice/get] error while getting advices",
                )
            return result