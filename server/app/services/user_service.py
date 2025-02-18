# app/services/user_service.py
from ..models import User, db

def get_all_users():
    return User.query.all()

def get_user_by_id(user_id):
    return User.query.get(user_id)

def create_user(username, email, password):
    if User.query.filter_by(username=username).first() or User.query.filter_by(email=email).first():
        return None, 'User already exists'
    
    user = User(username=username, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return user, 'User created successfully'

def update_user(user_id, username=None, email=None, password=None):
    user = User.query.get(user_id)
    if user:
        user.username = username if username else user.username
        user.email = email if email else user.email
        if password:
            user.set_password(password)
        db.session.commit()
        return user, 'User updated successfully'
    return None, 'User not found'

def delete_user(user_id):
    user = User.query.get(user_id)
    if user:
        db.session.delete(user)
        db.session.commit()
        return 'User deleted successfully'
    return 'User not found'
