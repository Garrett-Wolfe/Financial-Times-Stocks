from flask import Blueprint, jsonify

main_bp = Blueprint('main', __name__, url_prefix='/api')

@main_bp.route('/hello', methods=['GET'])
def hello():
    return jsonify({"message": "Hello from Flask!"})
