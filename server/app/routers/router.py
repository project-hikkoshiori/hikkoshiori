from controllers.advice import AdviceController
from controllers.db_test import DBTestController
from controllers.hello import HelloController
from controllers.property import PropertyController
from controllers.user import UserController


def register_routes(app, logger):
    DBTestController(app, logger)
    HelloController(app, logger)
    AdviceController(app, logger)
    PropertyController(app, logger)
    UserController(app, logger)
