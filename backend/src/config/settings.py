from pydantic_settings import BaseSettings
from typing import Optional

class Settings(BaseSettings):
    PROJECT_NAME: str = "AI Multi-Strategy Fund Architect"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    
    # Database
    DATABASE_URL: str = "postgresql+asyncpg://user:password@localhost/ai_fund_db"  # Change for production
    
    # AI / LLM
    OPENAI_API_KEY: Optional[str] = None
    
    # Data Providers
    TIINGO_API_KEY: Optional[str] = None
    POLYGON_API_KEY: Optional[str] = None
    
    # Global Settings
    TRADING_ENV: str = "PAPER" # PAPER or LIVE
    
    class Config:
        case_sensitive = True
        env_file = ".env"

settings = Settings()
