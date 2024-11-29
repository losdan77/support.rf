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
            query = f'select avg(mark), count(mark) from "comment" where id_for = {id_organization} group by id_for'
            result = await session.execute(text(query))
            return result.mappings().all()
        
    @classmethod
    async def find_all(cls, id_for: int):
        async with async_session_maker() as session:
            query = f"""select c.*, o.name_organization, o."FIO", o.photo_url from comment as c, organization as o 
where c.id_from=o.id and id_for = {id_for}"""
            result = await session.execute(text(query))
            return result.mappings().all()  