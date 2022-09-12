from msilib.schema import Class
from fastapi import FastAPI
from starlette.requests import Request

from server.app.models.housekeep import Housekeeps, Housekeep_tables, Housekeep_columns
import db
 
app = FastAPI(
    title='fastapiで作るシンプルなアプリケーションのテンプレートを利用',
    description='FastAPIチュートリアル：FastAPI(とstarlette)でシンプルなtoDoアプリを作りましょう．',
    version='0.9 beta'
)
 
 
def index(request: Request):
    return {'Hello': 'World'}

class HousekeepController:
    def __init__(self, app, logger):
        @app.get("/housekeep")
        def read_root():
            return {"Hello": "World"}