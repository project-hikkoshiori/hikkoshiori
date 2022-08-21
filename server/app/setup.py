from fastapi import FastAPI

from middlewares import setup_middleware
from logger import setup_logger
from routers.router import register_routes

app = FastAPI()
logger = setup_logger()

setup_middleware(app)

register_routes(app, logger)
