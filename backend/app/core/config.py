from typing import List, Union
from pydantic import AnyHttpUrl, validator
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    API_V1_STR: str = "/api"
    PROJECT_NAME: str = "Contexta Backend"
    
    # CORS Configuration
    # In production, this should be set to the specific frontend domain
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = [
        "http://localhost:5173",  # Vite default
        "http://localhost:3000",  # Alternative React port
    ]

    
    # OpenRouter Config
    OPENROUTER_API_KEY: str = ""
    OPENROUTER_MODEL: str = "mistralai/mistral-7b-instruct:free"

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
        extra = "ignore"

settings = Settings()
