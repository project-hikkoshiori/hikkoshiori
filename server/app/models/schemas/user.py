from uuid import UUID

from pydantic import BaseModel


class UserBase(BaseModel):
    id: UUID
    name: str
    email: str


class User(UserBase):
    class Config:
        orm_mode = True

class UserLayout(UserBase):
    """User for layout suggestion

    Attributes:
        layout_paths: path to suggested layout imgs.
        model_path: path to current model.

    """
    layout_paths: list
    model_path: str
