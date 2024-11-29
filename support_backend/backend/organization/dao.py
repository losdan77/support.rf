from sqlalchemy import select, or_, text
from backend.database import async_session_maker
from backend.dao.base import BaseDAO
from backend.organization.models import Organization, City, Type_organization

class OrganizationDAO(BaseDAO):
    model = Organization

    @classmethod
    async def find_by_name_or_fio(cls, name_organizations: str):
        async with async_session_maker() as session:
            query = (select(cls.model.__table__.columns)
                    .filter(or_(cls.model.name_organization.like(f'%{name_organizations}%'),
                                cls.model.FIO.like(f'%{name_organizations}%'),)))
            result = await session.execute(query)
            return result.mappings().all()
        
    @classmethod
    async def update_by_id(cls,
                           id: int,
                           name_organization: str,
                           site_url: str,
                           phone_1: str,
                           phone_2: str,
                           about: str,
                           FIO: str,
                           id_city: int):
        async with async_session_maker() as session:
            query = f"""update organization 
            set name_organization = '{name_organization}',
            site_url = '{site_url}',
            phone_1 = '{phone_1}',
            phone_2 = '{phone_2}',
            about = '{about}',
            "FIO" = '{FIO}',
            id_city = {id_city} 
            where id = {id} returning *"""
            await session.execute(text(query))
            await session.commit()

    @classmethod
    async def update_place_by_id(cls,
                           id: int,
                           latitude: str,
                           longitude: str):
        async with async_session_maker() as session:
            query = f"""update organization 
            set latitude = '{latitude}',
            longitude = '{longitude}'
            where id = {id} returning *"""
            await session.execute(text(query))
            await session.commit()

    @classmethod
    async def add_photo_url(cls, id: int, photo_url: str):
        async with async_session_maker() as session:
            query = f"""update organization
            set photo_url = '{photo_url}'
            where id = {id} returning *"""
            await session.execute(text(query))
            await session.commit()

    @classmethod
    async def update_password_by_id(cls, id: int, hashed_password: str):
        async with async_session_maker() as session:
            query = f"""update organization set hashed_password = '{hashed_password}' where id = {id}"""
            await session.execute(text(query))
            await session.commit()
            

class CityDAO(BaseDAO):
    model = City

class TypeOrganizationDAO(BaseDAO):
    model = Type_organization