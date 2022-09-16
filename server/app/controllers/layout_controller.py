class LayoutController:
    def __init__(self, app, logger):
        @app.get("/layout")
        def read_root():
            return {"Hello": "World"}

        @app.post("/layout")
        def make_layout(user_id: str, selection: int):
            try:
                result = get_new_layout(db, user_id, selection)
            except Exception as e:
                logger.error(e)
                raise HTTPException(
                    status_code=404, detail=f"cannot fetch properties of user {user_id}"
                )

            return result
