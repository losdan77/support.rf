import time
import asyncio
from password_generator import PasswordGenerator
from fastapi import APIRouter, Response, Depends
from typing import Optional
from fastapi_cache.decorator import cache
from pydantic import EmailStr
from backend.config import settings
from backend.organization.schemas import SOrganizationLogin, SOrganizationRegister, SOrganizationEdit
from backend.organization.schemas import SChangePassword
from backend.organization.dao import OrganizationDAO, TypeOrganizationDAO, CityDAO
from backend.organization.auth import get_password_hash, authenticate_user, create_access_token
from backend.organization.models import Organization, Type_organization, City
from backend.organization.dependecies import get_current_user
from backend.exception import ShortPasswordException, HasExistingUserException, ErrorLoginException
from backend.exception import VerifyPasswordException, VerifyOldPasswordException, OldAndNewPasswordEqException
from backend.exception import NotEmailRegisterException
from backend.tasks.tasks import send_new_password_on_email

router = APIRouter(
    prefix='/organizations',
    tags=['Организации']
)


@router.post('/registr')
async def registr_organization(organization_data: SOrganizationRegister):
    if organization_data.password != organization_data.password_verify:
        raise VerifyPasswordException

    if len(organization_data.password) < 5:
        raise ShortPasswordException
    
    existing_user = await OrganizationDAO.find_one_or_none(email=organization_data.email)
    if existing_user:
        raise HasExistingUserException
    
    if organization_data.city:
        id_city = await CityDAO.find_id(city=organization_data.city)
        
    hashed_password = get_password_hash(organization_data.password)

    if organization_data.id_type_organization == 1:
        # физ лицо
        await OrganizationDAO.add(email = organization_data.email,
                                  hashed_password = hashed_password,
                                  FIO = organization_data.FIO,
                                  phone_1 = organization_data.phone_1,
                                  phone_2 = organization_data.phone_2,
                                  about = organization_data.about,
                                  role=None,
                                  id_city = id_city['id'],
                                  id_type_organization=1)
        
    elif organization_data.id_type_organization == 2:
        # юр лицо
        await OrganizationDAO.add(email = organization_data.email,
                                  hashed_password = hashed_password,
                                  name_organization = organization_data.name_organization,
                                  phone_1 = organization_data.phone_1,
                                  phone_2 = organization_data.phone_2,
                                  site_url = organization_data.site_url,
                                  about = organization_data.about,
                                  role=None,
                                  id_city = id_city['id'],
                                  id_type_organization=2)
    return 'ok'

@router.post('/change_password')
async def change_password(organization_data: SChangePassword,
                          current_organization: Organization = Depends(get_current_user)):
    verify_old_password = await authenticate_user(current_organization['email'],
                                                  organization_data.old_password)
    
    if not verify_old_password:
        raise VerifyOldPasswordException
    
    if organization_data.old_password == organization_data.new_password:
        raise OldAndNewPasswordEqException
 
    if organization_data.new_password != organization_data.verify_new_password:
        raise VerifyPasswordException
    
    new_hashed_password = get_password_hash(organization_data.new_password)

    await OrganizationDAO.update_password_by_id(current_organization['id'],
                                       hashed_password = new_hashed_password)


@router.post('/login')
async def login_organization(response: Response, organization_data: SOrganizationLogin):
    user = await authenticate_user(organization_data.email, organization_data.password)
    if not user:
        raise ErrorLoginException
    access_token = create_access_token({'sub': str(user.id)})
    response.set_cookie('support_access_token', access_token, httponly=True)
    return access_token


@router.post('/logout')
async def logout_organization(response: Response):
    response.delete_cookie('support_access_token')


@router.post('/me')
# async def me_user(current_organization: Organization = Depends(get_current_user)):
async def me_user(access_token: str):
    current_organization = await get_current_user(access_token)
    return current_organization


@router.post('/add_type_organization')
async def add_type_organization(type_organization: str):
    await TypeOrganizationDAO.add(type_organization=type_organization)    



@router.get('/all_type_organization')
@cache(expire=60)
async def all_type_organization():
    all_type = await TypeOrganizationDAO.find_all()
    return all_type


@router.post('/add_city')
async def add_city(city: str):
    await CityDAO.add(city=city)    


@router.get('/all_city')
@cache(expire=60)
async def all_city():
    all_city = await CityDAO.find_all()
    return all_city


@router.get('/profile/{profile_id}')
@cache(expire=60)
async def get_profile_by_id(profile_id: int):
    profile = await OrganizationDAO.find_by_id(profile_id)
    city_dict = await CityDAO.find_by_id(profile['id_city'])
    profile = dict(profile)
    city_dict = dict(city_dict)
    profile['city'] = city_dict['city']
    return profile


@router.put('/edit_profile/{profile_id}')
async def edit_profile_bu_id(organization_data: SOrganizationEdit,
                             current_organization: Organization = Depends(get_current_user)):
    
    if organization_data.city:
        id_city = await CityDAO.find_id(city=organization_data.city)

    # id_organization = int(current_organization['id'])

    await OrganizationDAO.update_by_id(current_organization['id'],  
                                       name_organization = organization_data.name_organization,
                                       site_url = organization_data.site_url,
                                       phone_1 = organization_data.phone_1,
                                       phone_2 = organization_data.phone_2,
                                       about = organization_data.about,
                                       FIO = organization_data.FIO,
                                       id_city = id_city['id'])
    
    update_profile = await OrganizationDAO.find_by_id(current_organization['id'])
    return update_profile
    

@router.get('/find_organization_or_person')
async def find_organization_or_person(name_organization: Optional[str] = ''):
    organizations = await OrganizationDAO.find_by_name_or_fio(name_organization)
    return organizations


@router.post('/dont_remember_password')
async def dont_remember_password(email: EmailStr):
    result = await OrganizationDAO.find_one_or_none(email=email)
    if not result:
        raise NotEmailRegisterException
    
    pwo = PasswordGenerator()
    new_password = pwo.generate()

    new_hashed_password = get_password_hash(new_password)

    await OrganizationDAO.update_password_by_id(result['id'],
                                       hashed_password = new_hashed_password)
    
    send_new_password_on_email.delay(email, new_password)


@router.post('/update_my_place')
async def update_my_place(latitude: str,
                          longitude: str,
                          current_user: Organization = Depends(get_current_user)):
    await OrganizationDAO.update_place_by_id(id = current_user['id'],
                                             latitude = latitude,
                                             longitude = longitude)





    