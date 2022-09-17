from typing import List

from fastapi import Depends, HTTPException

from db import get_db
from sqlalchemy.orm import Session

from models.db.housekeep_column_db import get_user_housekeep_columns, add_housekeep_column
from models.schemas.housekeep_column import HouseKeepColumnResponse, HouseKeepColumnCreate,  HouseKeepColumn
class HouseKeepController:
    def __init__(self, app, logger):
        @app.get("/housekeeps/{user_id}", response_model=List[HouseKeepColumnResponse])
        async def get_housekeeps(user_id: str, db: Session = Depends(get_db)):
            try:
                result = get_user_housekeep_columns(db, user_id)
                print(result)
            except Exception as e:
                logger.error(e)
                raise HTTPException(
                    status_code=404,
                    detail="[controller/advice/get] error while getting advices",
                )
            return result

        @app.post("/housekeep-columns/{user_id}")
        async def post_housekeeps(request: HouseKeepColumnCreate, user_id: str, db: Session = Depends(get_db)):
            try:
                print(request)
                result = add_housekeep_column(db, request, user_id)

            except Exception as e:
                logger.error(e)
                raise HTTPException(
                    status_code=404,
                    detail="[controller/advice/get] error while posting housekeep-columns",
                )
            return {"msg": result}
