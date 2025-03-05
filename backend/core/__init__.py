from flask import Flask
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from .models import db
from .views.auth_views import auth_bp, jwt, login_manager
from .views.user_views import user_bp
from .views.s3_img_downloader import s3ImgDownloader_bp
from flask_cors import CORS
from dotenv import load_dotenv
import os

load_dotenv()

def create_app(config_type=os.getenv('CONFIG_TYPE')):
    app = Flask(__name__)
    app.config.from_object(config_type)

    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

    CORS(app)
    db.init_app(app)
    jwt.init_app(app)
    login_manager.init_app(app)
    # migrate = Migrate(app, db)  

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_bp, url_prefix='/api')
    app.register_blueprint(s3ImgDownloader_bp, url_prefix='/api')

    with app.app_context():
        db.create_all()

    return app