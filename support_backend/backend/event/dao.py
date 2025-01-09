from sqlalchemy import select, or_, update, text
from backend.database import async_session_maker
from backend.dao.base import BaseDAO
from backend.event.models import Event, Type_event, Theme_event

class EventDAO(BaseDAO):
    model = Event

    @classmethod
    async def get_event_count(cls, need_help: bool):
        async with async_session_maker() as session:
            query = f"select count(id) from event where need_help is {need_help};"
            result = await session.execute(text(query))
            return result.mappings().one()
        
    @classmethod
    async def get_event_count_by_id_organization(cls, id_organization: int):
        async with async_session_maker() as session:
            query = f"select count(id) from event where id_organization = {id_organization};"
            result = await session.execute(text(query))
            return result.mappings().one()

    @classmethod
    async def get_event_count_by_filter(cls, 
                                         need_help: bool,
                                         text_search: str,):
        async with async_session_maker() as session:
            query = f"""select count(e.id)
            from event as e 
            where e.need_help is {need_help} 
            and (e.text like '%{text_search}%' or e.short_text like '%{text_search}%');"""
            result = await session.execute(text(query))
            return result.mappings().one()
        
    @classmethod
    async def find_by_text_or_short_text(cls, 
                                         need_help: bool,
                                         text_search: str,
                                         limit: int,
                                         offset: int):
        async with async_session_maker() as session:
            query = f"""select e.*, c.city, te.type_event, o.name_organization, o."FIO", o.email, o.phone_1, o.phone_2, o.photo_url as prof_photo
            from event as e, city as c, type_event as te, organization as o 
            where o.id = e.id_organization and c.id = e.id_city and te.id = e.id_type_event and e.need_help is {need_help} 
            and (e.text like '%{text_search}%' or e.short_text like '%{text_search}%') order by e.created_at desc
            limit {limit} offset {offset}"""
            result = await session.execute(text(query))
            return result.mappings().all()
        
    @classmethod
    async def find_by_text_or_short_text_with_distance(cls, 
                                         need_help: bool,
                                         text_search: str,
                                         latitude: str,
                                         longitude: str,
                                         limit: int,
                                         offset: int):
        async with async_session_maker() as session:
            query = f"""select e.*, c.city, te.type_event, o.name_organization, o."FIO", o.email, o.phone_1, o.phone_2, o.photo_url as prof_photo,
(sqrt((COALESCE(NULLIF(e.latitude, '')::float, 0) - {latitude}) * (COALESCE(NULLIF(e.latitude, '')::float, 0) - {latitude}) + 
      (COALESCE(NULLIF(e.longitude, '')::float, 0) - {longitude}) * (COALESCE(NULLIF(e.longitude, '')::float, 0) - {longitude}))) as distance
from event as e
join city as c on c.id = e.id_city
join type_event as te on te.id = e.id_type_event
join organization as o on o.id = e.id_organization
where e.need_help is {need_help} and (e.text like '%{text_search}%' or e.short_text like '%{text_search}%')
order by distance, e.created_at desc limit {limit} offset {offset};"""
            result = await session.execute(text(query))
            return result.mappings().all()

    @classmethod
    async def find_all(cls, need_help: bool, offset: int, limit: int):
        async with async_session_maker() as session:
            query = f"""select e.*, c.city, te.type_event, o.name_organization, o."FIO", o.email, o.phone_1, o.phone_2, o.photo_url as prof_photo
            from event as e, city as c, type_event as te, organization as o
where o.id = e.id_organization and c.id = e.id_city and te.id = e.id_type_event and e.need_help is {need_help} order by e.created_at desc
limit {limit} offset {offset}"""
            result = await session.execute(text(query))
            return result.mappings().all() 
        
    @classmethod
    async def find_event_by_id(cls, id: int):
        async with async_session_maker() as session:
            query = f"""select e.*, c.city, te.type_event, o.name_organization, o."FIO", o.email, o.phone_1, o.phone_2, o.photo_url as prof_photo
            from event as e, city as c, type_event as te, organization as o
where o.id = e.id_organization and c.id = e.id_city and te.id = e.id_type_event and e.id = {id}"""
            result = await session.execute(text(query))
            return result.mappings().one() 
        
    @classmethod
    async def find_event_by_id_organization(cls, 
                                            id_organization: int,
                                            limit: int,
                                            offset: int):
        async with async_session_maker() as session:
            query = f"""select e.*, c.city, te.type_event, o.name_organization, o."FIO", o.email, o.phone_1, o.phone_2, o.photo_url as prof_photo
            from event as e, city as c, type_event as te, organization as o
where o.id = e.id_organization and c.id = e.id_city and te.id = e.id_type_event and e.id_organization = {id_organization} order by e.created_at desc
limit {limit} offset {offset}"""
            result = await session.execute(text(query))
            return result.mappings().all() 

    @classmethod
    async def find_all_with_distance(cls,
                                     need_help: bool,
                                     latitude: str, 
                                     longitude: str,
                                     limit: int,
                                     offset: int):
        async with async_session_maker() as session:
            query = f"""select e.*, c.city, te.type_event, o.name_organization, o."FIO", o.email, o.phone_1, o.phone_2, o.photo_url as prof_photo,
(sqrt((COALESCE(NULLIF(e.latitude, '')::float, 0) - {latitude}) * (COALESCE(NULLIF(e.latitude, '')::float, 0) - {latitude}) + 
      (COALESCE(NULLIF(e.longitude, '')::float, 0) - {longitude}) * (COALESCE(NULLIF(e.longitude, '')::float, 0) - {longitude}))) as distance
from event as e
join city as c on c.id = e.id_city
join type_event as te on te.id = e.id_type_event
join organization as o on o.id = e.id_organization
where e.need_help is {need_help}
order by distance, e.created_at desc
limit {limit} offset {offset}"""
            result = await session.execute(text(query))
            return result.mappings().all() 
        
    @classmethod
    async def max_id(cls):
        async with async_session_maker() as session:
            query = 'select max(id) from event'
            result = await session.execute(text(query))
            return result.mappings().one_or_none()
        
    @classmethod
    async def add_photo_url(cls, id: int, photo_url: str):
        async with async_session_maker() as session:
            query = f"""update event
            set photo_url = '{photo_url}'
            where id = {id} returning *"""
            await session.execute(text(query))
            await session.commit()

    @classmethod
    async def delete(cls, id: int, id_organization: int):
        async with async_session_maker() as session:
            query = f"""delete from event where id = {id} and id_organization = {id_organization} """
            await session.execute(text(query))
            await session.commit()

class TypeEventDAO(BaseDAO):
    model = Type_event

class ThemeEventDAO(BaseDAO):
    model = Theme_event