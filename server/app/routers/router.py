from controllers.db_test import DBTestController
from controllers.hello import HelloController
from controllers.advice import AdviceController


def register_routes(app, logger):
    DBTestController(app, logger)
    HelloController(app, logger)
    AdviceController(app, logger)
