def register_routes(app, logger):
    from controllers.db_test import DBTestController

    DBTestController(app, logger)
    from controllers.hello import HelloController

    HelloController(app, logger)
