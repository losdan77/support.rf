from pydantic import BaseModel, EmailStr
from typing import Optional

class SAddEvent(BaseModel):
    need_help: bool
    city: Optional[str] = None
    text: str
    people_count: Optional[int] = None
    short_text: str
    type_event: str
    latitude: str
    longitude: str
    access_token: str
