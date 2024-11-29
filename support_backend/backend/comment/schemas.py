from pydantic import BaseModel
from typing import Optional

class SComment(BaseModel):
    mark: int
    text: Optional[str] = None
    id_for: int
    