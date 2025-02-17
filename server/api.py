from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from flask_restful import Resource, Api, reqparse, fields, marshal_with, abort
import os

app = Flask(__name__)
cors = CORS(app, origins='*')
api = Api(app)

user = os.getenv('POSTGRES_USER')
password = os.getenv('POSTGRES_PASSWORD')
port = os.getenv('PORT')
db = os.getenv('POSTGRES_DB')
host = os.getenv('HOST')

postgres_url = f"postgresql://{user}:{password}@{host}:{port}/{db}"
app.config['SQLALCHEMY_DATABASE_URI'] = postgres_url
db = SQLAlchemy(app)

class UserModel(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), unique=True, nullable=False)
    email = db.Column(db.String(80), unique=True, nullable=False)

    def __repr__(self):
        return f'User(name= {self.name}, email= {self.email})'
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'email': self.email
        }
    
user_args = reqparse.RequestParser()
user_args.add_argument('name', type=str, required=True, help='Name is required.')
user_args.add_argument('email', type=str, required=True, help='Email is required.')

userFields = {
    'id': fields.Integer,
    'name': fields.String,
    'email': fields.String,
}

class Users(Resource):
    @marshal_with(userFields)
    def get(self):
        users = UserModel.query.all()
        return users
    
    @marshal_with(userFields)
    def post(self):
        args = user_args.parse_args()
        user = UserModel(name=args['name'], email=args['email'])
        db.session.add(user)
        db.session.commit()
        users = UserModel.query.all()
        return users, 201
    
class User(Resource):
    @marshal_with(userFields)
    def get(self, id):
        user = UserModel.query.filter_by(id=id).first()
        if not user:
            abort(404, message="User not found")
        return jsonify(user.to_dict())
    
    def patch(self,id):
        args = user_args.parse_args()
        user = UserModel.query.filter_by(id=id).first()
        if user:
            user.name = args["name"]
            user.email = args["email"]
            db.session.commit()
            return jsonify(user.to_dict())
        else:
            abort(404, message="User not found")
    
    def delete(self, id):
        user = UserModel.query.filter_by(id=id).first()
        if not user:
            abort(404, message="User not found")
        db.session.delete(user)
        db.session.commit()
        users = UserModel.query.all()
        return users, 200
    
api.add_resource(Users, '/api/users/')
api.add_resource(User, '/api/users/<int:id>')

with app.app_context():
   db.create_all()

@app.route('/')
def home():
    return 'Flask REST API checkit'


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000)