import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI, Query, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi_cache import FastAPICache
from fastapi_cache.backends.redis import RedisBackend
from fastapi_cache.decorator import cache
from redis import asyncio as aioredis
from sqladmin import Admin
from backend.admin.auth import authentication_backend
from backend.admin.view import OrganizationAdmin, TypeOrganizationAdmin
from backend.admin.view import CityAdmin, EventAdmin, ThemeEventAdmin
from backend.admin.view import TypeEventAdmin, CommentAdmin
from backend.database import engine_nullpool
from backend.organization.router import router as router_organization
from backend.event.router import router as router_event
from backend.comment.router import router as router_comment
from backend.image.router import router as router_image
from backend.config import settings



@asynccontextmanager
async def lifespan(app: FastAPI):
    redis = aioredis.from_url(f"redis://{settings.REDIS_HOST}:{settings.REDIS_PORT}")
    FastAPICache.init(RedisBackend(redis), prefix="cache")
    yield

app = FastAPI(title='Support', lifespan=lifespan)

app.mount('/static', StaticFiles(directory='backend/static'), 'static')

app.include_router(router_organization)
app.include_router(router_event)
app.include_router(router_comment)
app.include_router(router_image)

admin = Admin(app, engine_nullpool, authentication_backend=authentication_backend)

# admin.add_view(OrganizationAdmin)
# admin.add_view(TypeOrganizationAdmin)
# admin.add_view(CityAdmin)
# admin.add_view(EventAdmin)
# admin.add_view(TypeEventAdmin)
# admin.add_view(ThemeEventAdmin)
# admin.add_view(CommentAdmin)

origins = [
    'http://localhost:8000',
    '*',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['GET', 'POST', 'OPTIONS', 'DELETE', 'PATCH', 'PUT'],
    allow_headers=['Content-Type',
                   'Set-Cookie',
                   'Access-Control-Allow-Headers',
                   'Access-Control-Allow-Origin',
                   'Authorization'],
)