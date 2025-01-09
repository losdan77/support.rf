from sqlalchemy import select, or_, text
from backend.database import async_session_maker
from backend.dao.base import BaseDAO
from backend.organization.models import Organization, City, Type_organization

class OrganizationDAO(BaseDAO):
    model = Organization

    @classmethod
    async def find_by_name_or_fio(cls, name_organizations: str, limit: int, offset: int):
        async with async_session_maker() as session:
            query = f"""
                    select o.*, count(c.id) from organization o
                    left join comment c on c.id_for = o.id
                    where o.name_organization like '%{name_organizations}%' or o."FIO" like '%{name_organizations}%'
                    group by o.id
                    order by count(c.id) DESC
                    offset {offset} limit {limit}
                    """
            result = await session.execute(text(query))
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
    
    @classmethod      
    async def update_code_by_id(cls, id: int, recovery_password_code: str):
        async with async_session_maker() as session:
            query = f"""update organization set recovery_password_code = '{recovery_password_code}' where id = {id}"""
            await session.execute(text(query))
            await session.commit()

    @classmethod
    async def get_organization_count_by_filter(cls, 
                                               text_search: str,):
        async with async_session_maker() as session:
            query = f"""select count(o.id)
            from organization o
            where o.name_organization like '%{text_search}%' or o."FIO" like '%{text_search}%'"""
            result = await session.execute(text(query))
            return result.mappings().one()

class CityDAO(BaseDAO):
    model = City

class TypeOrganizationDAO(BaseDAO):
    model = Type_organization