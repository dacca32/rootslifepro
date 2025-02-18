from .user_views import Users, User

def register_views(api):
    api.add_resource(Users, '/api/users/')
    api.add_resource(User, '/api/users/<int:id>')

