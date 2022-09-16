from pydantic import BaseModel


class Layout(BaseModel):
    id: UUID

class LayoutRequest(BaseModel):
    pass
