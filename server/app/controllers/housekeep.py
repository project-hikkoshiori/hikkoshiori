from typing import List

from fastapi import Depends, HTTPException

from db import get_db
from sqlalchemy.orm import Session

from models.db.housekeep_column_db import (
    get_user_housekeep_columns,
    add_housekeep_column,
    delete_housekeep_column,
    update_housekeep_column,
)
from models.db.housekeep_table_db import add_housekeep_table
from models.db.housekeep_db import add_user_housekeep, get_user_housekeeps, delete_user_housekeeps
from models.schemas.housekeep_column import (
    HouseKeepColumnResponse,
    HouseKeepColumnCreate,
    HouseKeepColumn,
)
from models.schemas.housekeep_table import HouseKeepTableCreate


class HouseKeepController:
    def __init__(self, app, logger):
        @app.get("/housekeeps/{user_id}", response_model=List[HouseKeepColumnResponse])
        async def get_housekeeps(user_id: str, db: Session = Depends(get_db)):
            try:
                result = get_user_housekeep_columns(db, user_id)
            except Exception as e:
                logger.error(e)
                raise HTTPException(
                    status_code=404,
                    detail="[controller/housekeep/get] error while getting advices",
                )
            return result

        @app.delete("/housekeeps/{user_id}")
        async def delete_housekeeps(user_id: str, db: Session = Depends(get_db)):
            try:
                result = delete_user_housekeeps(db, user_id)
            except Exception as e:
                logger.error(e)
                raise HTTPException(
                    status_code=404,
                    detail="[controller/housekeep/delete] error while delete advices",
                )
            return {"meg": result}

        @app.post("/housekeeps/{user_id}/init")
        async def init_housekeep(user_id: str, db: Session = Depends(get_db)):
            try:
                housekeep = get_user_housekeeps(db, user_id)
                if housekeep != []:
                    raise HTTPException(
                        status_code=404,
                        detail="[controller/housekeep/init/post] this user already initialized",
                    )

                housekeep = add_user_housekeep(db, user_id)
                housekeep_id = housekeep.id

                # 不動産
                housekeep_table_properties = add_housekeep_table(
                    db, HouseKeepTableCreate(housekeep_id=housekeep_id, name="不動産")
                )
                properties_id = housekeep_table_properties.id
                properties = [("敷金", 100000), ("礼金", 100000), ("保証金", 50000)]
                for property in properties:
                    property_column = HouseKeepColumnCreate(
                        table_id=properties_id,
                        name=property[0],
                        value=property[1],
                        is_prepared=True,
                    )
                    result = add_housekeep_column(db, property_column, user_id)

                # 家具
                housekeep_table_furniture = add_housekeep_table(
                    db, HouseKeepTableCreate(housekeep_id=housekeep_id, name="家具")
                )
                furniture_id = housekeep_table_furniture.id
                furniture_list = [("冷蔵庫", 50000), ("洗濯機", 5000), ("テレビ", 5000)]
                for furniture in furniture_list:
                    furniture_column = HouseKeepColumnCreate(
                        table_id=furniture_id,
                        name=furniture[0],
                        value=furniture[1],
                        is_prepared=True,
                    )
                    result = add_housekeep_column(db, furniture_column, user_id)

            except HTTPException as e:
                raise e
            except Exception as e:
                logger.error(e)
                raise HTTPException(
                    status_code=404,
                    detail="[controller/housekeep/init/post] error while initializing housekeep",
                )
            return {"msg": result}

        @app.post("/housekeep-columns/{user_id}", response_model=HouseKeepColumn)
        async def post_housekeep_columns(
            request: HouseKeepColumnCreate, user_id: str, db: Session = Depends(get_db)
        ):
            try:
                result = add_housekeep_column(db, request, user_id)

            except HTTPException as e:
                raise e
            except Exception as e:
                logger.error(e)
                raise HTTPException(
                    status_code=404,
                    detail="[controller/housekeep/post] error while posting housekeep-columns",
                )
            return result

        @app.delete("/housekeep-columns/{user_id}")
        async def remove_housekeep_columns(
            request: HouseKeepColumn, user_id: str, db: Session = Depends(get_db)
        ):
            try:
                result = delete_housekeep_column(db, request, user_id)

            except Exception as e:
                logger.error(e)
                raise HTTPException(
                    status_code=404,
                    detail="[controller/housekeep/delete] error while deleting housekeep-columns",
                )
            return {"msg": result}

        @app.put("/housekeep-columns/{user_id}")
        async def put_housekeep_column(
            request: HouseKeepColumn, user_id: str, db: Session = Depends(get_db)
        ):
            try:
                result = update_housekeep_column(db, request, user_id)

            except Exception as e:
                logger.error(e)
                raise HTTPException(
                    status_code=404,
                    detail="[controller/housekeep/put] error while updating housekeep-columns",
                )
            return {"msg": result}
