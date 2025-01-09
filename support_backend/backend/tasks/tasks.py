#celery -A backend.tasks.celery_app:celery worker --loglevel=INFO
import boto3
import os
from botocore.exceptions import BotoCoreError, ClientError
import smtplib
from email.message import EmailMessage
from backend.tasks.celery_app import celery
from backend.config import settings

@celery.task
def upload_profile_image(file_path: str,
                         id_profile: int,
                         unique_argument: str):
    try:
        session = boto3.session.Session()
        s3 = session.client(
            service_name='s3',
            endpoint_url=settings.ENDPOINT_URL,
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.REGION_NAME
        )

        s3.upload_file(
            file_path, 
            settings.BACKET_NAME, 
            f'{id_profile}_profile_{unique_argument}.jpg'
            )
    except (BotoCoreError, ClientError) as e:
        print(e)
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)

@celery.task
def upload_event_image(file_path: str,
                       id_event: int,
                       unique_argument: str):
    try:
        session = boto3.session.Session()
        s3 = session.client(
            service_name='s3',
            endpoint_url=settings.ENDPOINT_URL,
            aws_access_key_id=settings.AWS_ACCESS_KEY_ID,
            aws_secret_access_key=settings.AWS_SECRET_ACCESS_KEY,
            region_name=settings.REGION_NAME
        )

        s3.upload_file(file_path, 
                settings.BACKET_NAME, 
                f'{id_event}_event_{unique_argument}.jpg')
    except (BotoCoreError, ClientError) as e:
        print(e)
    finally:
        if os.path.exists(file_path):
            os.remove(file_path)

@celery.task
def send_new_password_on_email(email: str,
                               new_password: str):
    msg_content = new_password

    msg = EmailMessage()
    msg.set_content(f'Ваш код для восстановления пароля: {msg_content}', charset='utf-8')
    msg['Subject'] = 'Новый код'
    msg['From'] = settings.SMTP_USER
    msg['To'] = email

    with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
        # server.set_debuglevel(1) 
        server.starttls()
        server.login(settings.SMTP_USER, settings.SMTP_PASS)
        server.send_message(msg)

@celery.task
def send_help_email(email: str,
                    email_from: str,
                    phone_1: str,
                    phone_2: str,
                    short_text: str):

    msg = EmailMessage()
    msg.set_content(f'На ваше событие "{short_text}" откликнулся пользователь {email_from} {phone_1} {phone_2}', 
                    charset='utf-8')
    msg['Subject'] = 'Отклик c Помоги.pф'
    msg['From'] = settings.SMTP_USER
    msg['To'] = email

    with smtplib.SMTP(settings.SMTP_HOST, settings.SMTP_PORT) as server:
        # server.set_debuglevel(1) 
        server.starttls()
        server.login(settings.SMTP_USER, settings.SMTP_PASS)
        server.send_message(msg)
    
    