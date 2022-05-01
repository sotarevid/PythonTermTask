from .api import api as api_blueprint
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS


def run():
    app = Flask(__name__, static_url_path='',
                static_folder='build', template_folder='build')
    CORS(app)

    SQLAlchemy(app)

    app.config['SECRET_KEY'] = 'fb3a921ffc6e35e8cf8630820cc3e3fe56d2a4ceac81332f'
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'

    app.register_blueprint(api_blueprint)

    app.run()


run()
