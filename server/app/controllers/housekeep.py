from fastapi import FastAPI
from starlette.requests import Request
 
app = FastAPI(
    title='fastapiで作るシンプルなアプリケーションのテンプレートを利用',
    description='FastAPIチュートリアル：FastAPI(とstarlette)でシンプルなtoDoアプリを作りましょう．',
    version='0.9 beta'
)
 
 
def index(request: Request):
    return {'Hello': 'World'}