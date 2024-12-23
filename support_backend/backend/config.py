from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    
    REDIS_HOST: str
    REDIS_PORT: str 
    
    DB_HOST: str
    DB_PORT: int
    DB_USER: str
    DB_PASS: str
    DB_NAME: str
    
    @property
    def DATABASE_URL(self):
        return f"postgresql+asyncpg://{self.DB_USER}:{self.DB_PASS}@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
    
    POSTGRES_PASSWORD: str
    POSTGRES_USER: str
    POSTGRES_DB: str

    SECRET_WORD: str
    HASH_ALGORITHM: str

    ENDPOINT_URL: str
    AWS_ACCESS_KEY_ID: str
    AWS_SECRET_ACCESS_KEY: str
    REGION_NAME: str
    BACKET_NAME: str

    SMTP_HOST: str
    SMTP_PORT: str
    SMTP_USER: str
    SMTP_PASS: str

    RABBIT_HOST: str
    RABBIT_PORT: str
    RABBIT_USER: str
    RABBIT_PASWORD: str

    @property
    def RABBITMQ_URL(self):
        return f'amqp://{self.RABBIT_USER}:{self.RABBIT_PASWORD}@{self.RABBIT_HOST}:{self.RABBIT_PORT}//'

    model_config = SettingsConfigDict(env_file=".env")

settings = Settings()