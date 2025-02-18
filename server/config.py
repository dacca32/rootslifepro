import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Config:
    POSTGRES_USER = os.getenv('POSTGRES_USER')
    POSTGRES_PASSWORD = os.getenv('POSTGRES_PASSWORD')
    POSTGRES_DB = os.getenv('POSTGRES_DB')
    POSTGRES_HOST = os.getenv('POSTGRES_HOST')
    POSTGRES_PORT = os.getenv('POSTGRES_PORT')
    SQLALCHEMY_DATABASE_URI = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@{POSTGRES_HOST}:{POSTGRES_PORT}/{POSTGRES_DB}"
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    # Debug prints to verify environment variables
    print("POSTGRES_USER:", POSTGRES_USER)
    print("POSTGRES_PASSWORD:", POSTGRES_PASSWORD)
    print("POSTGRES_DB:", POSTGRES_DB)
    print("POSTGRES_HOST:", POSTGRES_HOST)
    print("POSTGRES_PORT:", POSTGRES_PORT)
    print("SQLALCHEMY_DATABASE_URI:", SQLALCHEMY_DATABASE_URI)

class DevelopmentConfig(Config):
    DEBUG = True

class ProductionConfig(Config):
    DEBUG = False
