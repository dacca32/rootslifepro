from flask import Flask
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from .models import db
from .views.auth_views import auth_bp, jwt, login_manager
from .views.user_views import user_bp
from .views.s3_img_downloader import s3ImgDownloader_bp
from config import Config
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    app.config['SECRET_KEY'] = Config.SECRET_KEY
    app.config['JWT_SECRET_KEY'] = Config.JWT_SECRET_KEY

    CORS(app)
    db.init_app(app)
    jwt.init_app(app)
    login_manager.init_app(app)
    migrate = Migrate(app, db)  

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_bp, url_prefix='/api')
    app.register_blueprint(s3ImgDownloader_bp, url_prefix='/api')

    with app.app_context():
        db.create_all()

    return app