from flask import Flask
from flask_cors import CORS
from flask_restful import Api
from .models import db, User
from .views.user_views import user_bp
from config import Config

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    app.register_blueprint(user_bp, url_prefix='/api')  # Register the Blueprint with a prefix
                    

    with app.app_context():
        db.create_all()

    return app