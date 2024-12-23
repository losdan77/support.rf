import asyncio
from fastapi import APIRouter, Response, Depends
from typing import Optional
from fastapi_cache.decorator import cache
from pydantic import EmailStr
from backend.organization.dependecies import get_current_user
from backend.organization.models import Organization, Type_organization, City
from backend.organization.dao import CityDAO, OrganizationDAO
from backend.event.dao import EventDAO, TypeEventDAO, ThemeEventDAO
from backend.event.schemas import SAddEvent
from backend.tasks.tasks import send_help_email


router = APIRouter(
    prefix='/events',
    tags=['События']
)

@router.post('/add_event')
async def add_event(event_data: SAddEvent):
    current_organization = await get_current_user(event_data.access_token)
    if event_data.city:
        id_city = await CityDAO.find_id(city=event_data.city)
    else: 
        id_city = None

    id_type_event = await TypeEventDAO.find_id(type_event = event_data.type_event)

    await EventDAO.add(need_help = event_data.need_help,
                       text = event_data.text,
                       short_text = event_data.short_text,
                       people_count = event_data.people_count,
                       id_organization = current_organization['id'],
                       id_city = id_city['id'],
                       id_type_event = id_type_event['id'],
                       latitude = event_data.latitude,
                       longitude = event_data.longitude)
    
    return 'ok'


@router.get('/get_all_event')
@cache(expire=60)
async def get_all_event(need_help: bool):
    latitude = None
    longitude = None
    
    try:
        current_organization = get_current_user
        organization = await OrganizationDAO.find_by_id(current_organization['id'])
        latitude = organization['latitude']
        longitude = organization['longitude']
    except:
        pass

    if not latitude and not longitude:
        all_event = await EventDAO.find_all(need_help = need_help)
    else:
        all_event = await EventDAO.find_all_with_distance(need_help = need_help,
                                            latitude = latitude,
                                            longitude = longitude)
    return all_event


@router.get('/get_event_by_id_organization')
@cache(expire=60)
async def get_event_by_id_organization(id_organization: int):
    events = await EventDAO.find_event_by_id_organization(id_organization = id_organization)
    return events


@router.get('/get_event_by_id')
@cache(expire=60)
async def get_event_by_id(id_event: int):
    event = await EventDAO.find_event_by_id(id = id_event)
    return event


@router.delete('/delete_event_by_id')
async def delete_event_by_id(id_event: int,
                             current_organization: Organization = Depends(get_current_user)):
    organization = await EventDAO.find_by_id(id_event)

    if organization['id_organization'] != current_organization['id']:
        raise 'no' 

    await EventDAO.delete(id = id_event,
                          id_organization = current_organization['id'])


@router.post('/add_type_event')
async def add_type_event(type_event: str,
                         id_theme_event: int):
    await TypeEventDAO.add(type_event=type_event,
                           id_theme_event=id_theme_event)
    

@router.get('/all_type_event')
@cache(expire=60)
async def all_type_event():
    all_type_event = await TypeEventDAO.find_all()
    return all_type_event


@router.get('/all_type_event_by_theme')
async def all_type_event_by_theme(id_theme_event: int):
    all_type_by_theme = await TypeEventDAO.find_all(id_theme_event=id_theme_event)
    return all_type_by_theme
    

@router.post('/add_theme_event')
async def add_theme_event(theme_event: str):
    await ThemeEventDAO.add(theme_event=theme_event)


@router.get('/all_theme_event')
async def all_theme_event():
    all_theme = await ThemeEventDAO.find_all()
    return all_theme


@router.get('/find_event_by_text_or_short_text')
async def find_event_by_text_or_short_text(need_help: bool,
                                           access_token: str | None = None,
                                           text: Optional[str] = '',):
    latitude = None
    longitude = None

    if access_token:
        current_organization = await get_current_user(access_token)
        organization = await OrganizationDAO.find_by_id(current_organization['id'])
        latitude = organization['latitude']
        longitude = organization['longitude']

    if not latitude and not longitude:
        events = await EventDAO.find_by_text_or_short_text(need_help, text)
    else:
        events = await EventDAO.find_by_text_or_short_text_with_distance(need_help, 
                                                                         text,
                                                                         latitude,
                                                                         longitude)
    return events


@router.post('/send_help_message_on_email')
async def send_help_message_on_email(email: EmailStr,
                                     short_text: str,
                                     current_organization: Organization = Depends(get_current_user)):
    organization = await OrganizationDAO.find_by_id(current_organization['id'])
    
    short_text = short_text

    email = email
    
    if organization['phone_1']:
        phone_1 = organization['phone_1']
    else:
        phone_1 = ''

    if organization['phone_2']:
        phone_2 = organization['phone_2']
    else:
        phone_2 = ''

    send_help_email.delay(email,
                          phone_1,
                          phone_2,
                          short_text)
    
