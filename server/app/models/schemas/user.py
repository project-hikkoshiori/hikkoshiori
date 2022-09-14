from uuid import UUID

from pydantic import BaseModel


class UserBase(BaseModel):
    id: UUID
    name: str
    email: str


class User(UserBase):
    class Config:
        orm_mode = True


class AuthUser(UserBase):
    password: str
