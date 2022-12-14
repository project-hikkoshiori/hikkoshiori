from typing import List

from fastapi import Depends, HTTPException

from db import get_db
from sqlalchemy.orm import Session

from models.schemas.advice import Advice, AdviceCreate, AdviceWithUser
from models.db.advice_db import (
    get_advices_db,
    get_advice_db,
    add_advices_db,
    get_filtered_advices_db,
)


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

        @app.get("/advices/filter", response_model=List[AdviceWithUser])
        async def get_filtered_advices(
            gender: str = None,
            user_type: str = None,
            work_pattern: str = None,
            free_word: str = None,
            db: Session = Depends(get_db),
        ):
            try:
                result = get_filtered_advices_db(db, gender, user_type, work_pattern, free_word)
            except Exception as e:
                logger.error(e)
                raise HTTPException(
                    status_code=404,
                    detail="[controller/advice/filter/get] error while getting filtered advice",
                )
            return result

        @app.get("/advices/{advice_id}", response_model=Advice)
        async def get_advice(advice_id, db: Session = Depends(get_db)):
            try:
                result = get_advice_db(advice_id, db)
            except Exception as e:
                logger.error(e)
                raise HTTPException(
                    status_code=404,
                    detail="[controller/advice/get] error while getting advice, id is {advice_id}",
                )
            return result

        @app.post("/advices", response_model=Advice)
        async def post_advices(body: AdviceCreate, db: Session = Depends(get_db)):
            try:
                result = add_advices_db(db, body)
            except Exception as e:
                logger.error(e)
                raise HTTPException(
                    status_code=404,
                    detail="[controller/advice/post] error while adding advices",
                )
            return result
