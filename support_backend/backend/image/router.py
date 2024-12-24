import shutil
import time
from fastapi import APIRouter, UploadFile, Depends
from backend.config import settings
from backend.exception import NoPermitException
from backend.organization.dao import OrganizationDAO
from backend.event.dao import EventDAO
from backend.organization.models import Organization
from backend.organization.dependecies import get_current_user
from backend.tasks.tasks import upload_profile_image, upload_event_image

router = APIRouter(
    prefix='/images',
    tags=['Картинки'],
)

@router.post('/add_profile_image')
async def add_profile_photo(id_profile: int,
                            file: UploadFile,
                            access_token: str):
    current_organization = await get_current_user(access_token)
    file_path = f'backend/static/images/{id_profile}_profile.webp'
    with open(file_path, 'wb+') as file_object:
        shutil.copyfileobj(file.file, file_object)  
    await OrganizationDAO.add_photo_url(id_profile, file_path)


@router.post('/add_event_image')
async def add_event_photo(id_event: int,
                          file: UploadFile,
                          access_token: str):
    current_organization = await get_current_user(access_token)
    file_path = f'backend/static/images/{id_event}_event.webp'
    with open(file_path, 'wb+') as file_object:
        shutil.copyfileobj(file.file, file_object)  
    await EventDAO.add_photo_url(id_event, file_path)
 

@router.post('/add_profile_image_to_s3')
async def add_profile_image_to_s3(id_profile: int,
                                  file: UploadFile,
                                  access_token: str):
    current_organization = await get_current_user(access_token)
    if id_profile != current_organization['id']:
        raise NoPermitException

    file_path = f'backend/static/images/{id_profile}_profile.jpg'
    with open(file_path, 'wb+') as file_object:
        shutil.copyfileobj(file.file, file_object)

    unique_argument = time.time()

    file_url = f'https://storage.yandexcloud.net/{settings.BACKET_NAME}/{id_profile}_profile_{unique_argument}.jpg'
    await OrganizationDAO.add_photo_url(id_profile, file_url)

    upload_profile_image.delay(file_path, id_profile, unique_argument)
    

@router.post('/add_event_image_to_s3')
async def add_profile_image_to_s3(id_event: int,
                                  file: UploadFile,
                                  access_token: str):
    current_organization = await get_current_user(access_token)
    id_organization = await EventDAO.find_by_id(id_event)
    if id_organization['id_organization'] != current_organization['id']:
        raise NoPermitException

    file_path = f'backend/static/images/{id_event}_event.jpg'
    with open(file_path, 'wb+') as file_object:
        shutil.copyfileobj(file.file, file_object)
    
    file_url = f'https://storage.yandexcloud.net/{settings.BACKET_NAME}/{id_event}_event.jpg'
    await EventDAO.add_photo_url(id_event, file_url)

    upload_event_image.delay(file_path, id_event)
    

@router.get('get_url_image_profile_from_s3')
async def get_url_image_profile_from_s3(id_profile: int):
    url_image = f'https://storage.yandexcloud.net/{settings.BACKET_NAME}/{id_profile}_profile.jpg'
    return url_image
    
    
@router.get('get_url_image_event_from_s3')
async def get_url_image_profile_from_s3(id_event: int):
    url_image = f'https://storage.yandexcloud.net/{settings.BACKET_NAME}/{id_event}_event.jpg'
    return url_image