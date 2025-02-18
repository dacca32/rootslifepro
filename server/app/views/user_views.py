# app/views/user_views.py
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from ..services.user_service import get_user_by_id, create_user, update_user, delete_user, get_all_users

user_bp = Blueprint('user_bp', __name__)

@user_bp.route('/users', methods=['GET'])
def get_users():
    users = get_all_users()
    return jsonify([user.to_dict() for user in users]), 200

@user_bp.route('/profile', methods=['GET'])
@jwt_required()
def profile():
    user_id = get_jwt_identity()
    user = get_user_by_id(user_id)
    if user:
        return jsonify(user.to_dict()), 200
    return jsonify({'message': 'User not found'}), 404

@user_bp.route('/profile', methods=['PUT'])
@jwt_required()
def update_profile():
    user_id = get_jwt_identity()
    data = request.get_json()

    user, message = update_user(user_id, data.get('username'), data.get('email'), data.get('password'))
    if user:
        return jsonify({'message': message}), 200
    return jsonify({'message': message}), 404
