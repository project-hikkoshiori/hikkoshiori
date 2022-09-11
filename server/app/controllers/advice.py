from http.client import HTTPException
from typing import List

from fastapi import Depends

from db import get_db
from sqlalchemy.orm import Session

from models.schemas.advice import Advice
from models.db.advice_db import get_advices_db


class AdviceController:
    def __init__(self, app, logger):
        @app.get("/advices", response_model=List[Advice])
        async def get_advices(db: Session = Depends(get_db)):
            try:
                result = get_advices_db(db)
            except Exception as e:
                logger.error(e)
                raise HTTPException(
                    status_code=404,
                    detail="[controller/advice/get] error while getting advices",
                )
            return result
