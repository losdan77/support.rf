from sqlalchemy import delete, and_, text
from backend.database import async_session_maker
from backend.dao.base import BaseDAO
from backend.comment.models import Comment

class CommentDAO(BaseDAO):
    model = Comment

    @classmethod
    async def delete_by_id(cls, id_comment: int, id_organization: int):
        async with async_session_maker() as session:
            query = f'delete from comment where id = {id_comment} and id_from = {id_organization}'
            await session.execute(text(query))
            await session.commit()

    @classmethod
    async def select_count_and_avg_mark(cls, id_organization: int):
        async with async_session_maker() as session:
            query = f'select round(avg(mark), 2) as avg_mark, count(mark) as count_mark from "comment" where id_for = {id_organization} group by id_for'
            result = await session.execute(text(query))
            return result.mappings().one_or_none()
        
    @classmethod
    async def find_all(cls, id_for: int, limit: int, offset: int):
        async with async_session_maker() as session:
            query = f"""select c.*, o.name_organization, o."FIO", o.photo_url from comment as c, organization as o 
where c.id_from=o.id and id_for = {id_for} order by c.id DESC limit {limit} offset {offset}"""
            result = await session.execute(text(query))
            return result.mappings().all()  
        
    @classmethod
    async def get_comments_count_by_id_organization(cls, id_for: int):
        async with async_session_maker() as session:
            query = f"select count(id) from comment where id_for = {id_for};"
            result = await session.execute(text(query))
            return result.mappings().one()