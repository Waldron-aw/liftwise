from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    database_url: str = "postgresql://liftwise:liftwise@localhost:5432/liftwise"
    anthropic_api_key: str = ""
    firebase_project_id: str = ""
    secret_key: str = "dev-secret-change-in-production"
    environment: str = "development"

    class Config:
        env_file = ".env"


settings = Settings()
