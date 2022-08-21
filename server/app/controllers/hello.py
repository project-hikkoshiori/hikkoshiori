class HelloController:
    def __init__(self, app, logger):
        @app.get("/")
        def read_root():
            return {"Hello": "World"}
