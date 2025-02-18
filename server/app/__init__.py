from flask import Flask
from flask_jwt_extended import JWTManager
from flask_migrate import Migrate
from .models import db
from .views.auth_views import auth_bp, jwt, login_manager
from .views.user_views import user_bp
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    app.config['SECRET_KEY'] = 'your_secret_key'
    app.config['JWT_SECRET_KEY'] = 'your_jwt_secret_key'

    db.init_app(app)
    jwt.init_app(app)
    login_manager.init_app(app)
    migrate = Migrate(app, db)  

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(user_bp, url_prefix='/api')  # Register the Blueprint with a prefix
                    

    with app.app_context():
        db.create_all()

    return app