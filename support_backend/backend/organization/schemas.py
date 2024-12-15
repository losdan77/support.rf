from pydantic import BaseModel, EmailStr
from typing import Optional

class SOrganizationRegister(BaseModel):
    email: EmailStr
    password: str
    password_verify: str
    name_organization: Optional[str] = None
    site_url: Optional[str] = None
    phone_1: Optional[str] = None
    phone_2: Optional[str] = None
    about: Optional[str] = None
    FIO: Optional[str] = None
    city: Optional[str] = None
    id_type_organization: int

class SChangePassword(BaseModel):
    old_password: str
    new_password: str
    verify_new_password: str

class SOrganizationLogin(BaseModel):
    email: EmailStr
    password: str

class SOrganizationEdit(BaseModel):
    name_organization: Optional[str] = None
    site_url: Optional[str] = None
    phone_1: Optional[str] = None
    phone_2: Optional[str] = None
    about: Optional[str] = None
    FIO: Optional[str] = None
    city: Optional[str] = None
    access_token: str
