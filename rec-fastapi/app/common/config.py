from typing import List, Union
import logging

from pydantic import AnyHttpUrl, BaseSettings, validator
from dotenv import load_dotenv
import os

load_dotenv()


class Settings(BaseSettings):
    PROJECT_NAME: str
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []
    MODEL_PATH: str
    DATASET_PATH: str
    ITEM_FEATURES_PATH: str
    USER_FEATURES_PATH: str
    RATING_PATH: str
    ENCODING: str
    N_USERS: int
    LOG_LEVEL: str
    ENV: str

    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)

    class Config:
        case_sensitive = True
        env_file = ".env"


class DevSettings(Settings):
    class Config:
        env_file = ".env.dev"


class ProdSettings(Settings):
    class Config:
        env_file = ".env.prod"


def get_settings() -> Union[DevSettings, ProdSettings]:
    if os.getenv("ENV") == "PROD":
        return ProdSettings()
    return DevSettings()


settings = get_settings()


logging.basicConfig(
    level=settings.LOG_LEVEL,  # 로그 수준
    format="%(asctime)s %(levelname)s %(message)s",
    handlers=[
        logging.StreamHandler()
    ]
)
