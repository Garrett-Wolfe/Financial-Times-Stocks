from flask import Flask, send_from_directory
from flask_cors import CORS
from config import Config
import os

def create_app(config_class=Config):
    app = Flask(__name__, static_folder='../dist', static_url_path='')
    app.config.from_object(config_class)
    
    CORS(app)

    # Import and register blueprints here
    from app.routes import main_bp
    app.register_blueprint(main_bp)

    @app.route('/')
    def serve():
        return send_from_directory(app.static_folder, 'index.html')

    @app.errorhandler(404)
    def not_found(e):
        return send_from_directory(app.static_folder, 'index.html')

    return app
