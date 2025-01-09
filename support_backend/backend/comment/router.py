from fastapi import APIRouter, Response, Depends
from fastapi_cache.decorator import cache
from backend.organization.dependecies import get_current_user
from backend.organization.models import Organization, Type_organization, City
from backend.comment.dao import CommentDAO
from backend.comment.schemas import SComment


router = APIRouter(
    prefix='/comments',
    tags=['Коментарии']
)

@router.post('/add_comment')
async def add_comment(comment_data: SComment):
    current_organization = await get_current_user(comment_data.access_token)
    await CommentDAO.add(mark = comment_data.mark,
                         text = comment_data.text,
                         id_from = current_organization['id'],
                         id_for = comment_data.id_for)
    

@router.delete('/delete_comment_by_id')
async def delete_comment_by_id(id_comment: int,
                               access_token: str):
    current_organization = await get_current_user(access_token)
    await CommentDAO.delete_by_id(id_comment,
                                  current_organization['id'])
    return 'ok'


@router.get('/get_comments_count_by_id_organization')
async def get_comments_count_by_id_organization(id_organization: int):
    count = await CommentDAO.get_comments_count_by_id_organization(id_for=id_organization)
    return count


@router.get('/get_comments_by_id_organization')
async def get_commnts_by_id_organization(id_organization: int,
                                         limit: int = 5,
                                         page: int = 1):
    offset = (page - 1) * limit
    comments = await CommentDAO.find_all(id_for=id_organization,
                                         limit=limit,
                                         offset=offset)
    return comments


@router.get('/get_avg_and_count_mark')
async def get_avg_and_count_mark(id_organization: int):
    avg_and_count_mark = await CommentDAO.select_count_and_avg_mark(id_organization)
    return avg_and_count_mark