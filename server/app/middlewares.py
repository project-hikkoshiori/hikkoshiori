from fastapi.middleware.cors import CORSMiddleware

# middleware設定


def setup_middleware(app):
    origins = [
        "http://localhost",
        "http://localhost:3000",
        "http://localhost:8080",
    ]

    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )