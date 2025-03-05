# test/test_user_service.py
import pytest
from app import create_app, db
from config import Config
from app.models import User
from app.services.user_service import get_all_users, get_user_by_id, create_user

@pytest.fixture(scope='module')
def test_client():
    app = create_app()
    app.config.from_object(Config)

    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = Config.SQLALCHEMY_DATABASE_URI
    
    testing_client = app.test_client()

    with app.app_context():
        db.create_all()
        yield testing_client  # this is where the testing happens!
        db.session.remove()
        db.drop_all()

@pytest.fixture(scope='module')
def new_user():
    user = User(name='testuser', email='testuser@example.com')
    user.set_password('testpassword')  # Set password
    return user

def test_get_all_users(test_client):
    print("Starting test_get_all_users")
    user1 = User(name='user1', email='user1@example.com')
    user1.set_password('password1')  # Set password
    user2 = User(name='user2', email='user2@example.com')
    user2.set_password('password2')  # Set password
    db.session.add(user1)
    db.session.add(user2)
    db.session.commit()
    print("Added users to the database")
    users = get_all_users()
    assert len(users) == 2
    print("Finished test_get_all_users")

def test_get_user_by_id(test_client, new_user):
    print("Starting test_get_user_by_id")
    db.session.add(new_user)
    db.session.commit()

    print("Added new user to the database")
    user = get_user_by_id(new_user.id)
    assert user.name == 'testuser'
    assert user.email == 'testuser@example.com'
    print("Finished test_get_user_by_id")

def test_create_user(test_client):
    print("Starting test_create_user")
    user, message = create_user('newuser', 'newuser@example.com', 'password')
    assert user is not None
    assert user.name == 'newuser'
    assert user.email == 'newuser@example.com'
    assert message == 'User created successfully'

    print("Created new user")
    user, message = create_user('newuser', 'newuser@example.com', 'password')
    assert user is None
    assert message == 'User already exists'
    print("Finished test_create_user")