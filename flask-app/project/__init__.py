from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()
app = Flask(__name__, static_url_path='',
            static_folder='build', template_folder='build')


def create_app():
    CORS(app)

    app.config['SECRET_KEY'] = 'fb3a921ffc6e35e8cf8630820cc3e3fe56d2a4ceac81332f'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'

    db.init_app(app)

    from .models import User

    from .api import api as api_blueprint
    app.register_blueprint(api_blueprint)

    return app
