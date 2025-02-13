from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
cors = CORS(app, origins='*')

@app.route('/api/users/', methods=['GET'])
def get_users():
    return jsonify(
        users=[
            {
                'id': 1,
                'name': 'John Doe',
                'email': 'john.doe@example.com'
            },
            {
                'id': 2,
                'name': 'Jane Smith',
                'email': 'jane.smith@example.com'
            }
        ]
    )

if __name__ == '__main__':
    app.run(debug=True, port=8080)