from fastapi import FastAPI

from middlewares import setup_middleware
from logger import setup_logger

app = FastAPI()
logger = setup_logger()

setup_middleware(app)