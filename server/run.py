from app import create_app

print("Starting Flask application...")

app = create_app()

@app.route('/')
def home():
    return 'Flask REST API checkit'

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=8080)
