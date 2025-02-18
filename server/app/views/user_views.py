# server/app/views/user_views.py
from flask import Blueprint
from flask_restful import Api, Resource, reqparse, fields, marshal_with, abort
from ..models import User, db

user_bp = Blueprint('user_bp', __name__)
api = Api(user_bp)

user_args = reqparse.RequestParser()
user_args.add_argument('name', type=str, required=True, help='Name is required.')
user_args.add_argument('email', type=str, required=True, help='Email is required.')
user_args.add_argument('age', type=int, required=False)

userFields = {
    'id': fields.Integer,
    'name': fields.String,
    'email': fields.String,
    'age': fields.Integer
}

class Users(Resource):
    @marshal_with(userFields)
    def get(self):
        users = User.query.all()
        return users

    @marshal_with(userFields)
    def post(self):
        args = user_args.parse_args()
        user = User(name=args['name'], email=args['email'], age=args['age'])
        db.session.add(user)
        db.session.commit()
        return user, 201

class UserResource(Resource):
    @marshal_with(userFields)
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            abort(404, message="User not found")
        return user

    @marshal_with(userFields)
    def patch(self, id):
        args = user_args.parse_args()
        user = User.query.filter_by(id=id).first()
        if user:
            user.name = args['name']
            user.email = args['email']
            user.age = args['age']
            db.session.commit()
            return user
        else:
            abort(404, message="User not found")

    @marshal_with(userFields)
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            abort(404, message="User not found")
        db.session.delete(user)
        db.session.commit()
        return '', 204

api.add_resource(Users, '/users')
api.add_resource(UserResource, '/users/<int:id>')
