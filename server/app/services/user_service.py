from ..models import UserModel, db

def create_user(name, email):
    user = UserModel(name=name, email=email)
    db.session.add(user)
    db.session.commit()
    return user

def get_all_users():
    return UserModel.query.all()

