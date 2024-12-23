from celery import Celery
from backend.config import settings

celery = Celery(
    'tasks',
    broker=settings.RABBITMQ_URL,
    include=['backend.tasks.tasks'],
)