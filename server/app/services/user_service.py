# app/services/user_service.py
from ..models import User, db
from sqlalchemy.orm import Session

def get_all_users():
    return User.query.all()

def get_user_by_id(user_id):
    with Session(bind=db.engine) as session:
        return session.get(User, user_id)

def create_user(name, email, password):
    if User.query.filter_by(name=name).first() or User.query.filter_by(email=email).first():
        return None, 'User already exists'
    
    user = User(name=name, email=email)
    user.set_password(password)
    db.session.add(user)
    db.session.commit()
    return user, 'User created successfully'

def update_user(user_id, name=None, email=None, password=None):
    with Session(bind=db.engine) as session:
        user = session.get(User, user_id)
        if user:
            user.name = name if name else user.name
            user.email = email if email else user.email
            if password:
                user.set_password(password)
            session.commit()
            return user, 'User updated successfully'
    return None, 'User not found'

def delete_user(user_id):
    with Session(bind=db.engine) as session:
        user = session.get(User, user_id)
        if user:
            session.delete(user)
            session.commit()
            return 'User deleted successfully'
    return 'User not found'
