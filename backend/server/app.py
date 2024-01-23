from flask import Flask, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from dotenv import dotenv_values
from models import db, User, Connection, Meme, Response
config = dotenv_values(".env")


from models import db

app = Flask(__name__)
app.secret_key = config['FLASK_SECRET_KEY']
# NEED SECRET KEY PAGE
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
bcrypt = Bcrypt(app)
migrate = Migrate(app, db)

db.init_app(app)

@app.get('/')
def index():
    return "Hello world"

# ***************Authentication GET, POST, and DELETE requests**********************
@app.get('/check_session')
def check_session():
    user = db.session.get(User, session.get(id))
    # print to check the session object
    print(session)

    if user:
        return user.to_dict(['-password_hash']), 200

    return {}

@app.delete('/logout')
def logout():

    try: 
        session.pop(id)
        return {"Message": "Logged out"}, 200
    
    except:
        return {'Message': 'No user logged in'}, 404

@app.post('/')
def login():
    data = request.json

    user = User.query.filter(User.name == data.get('password')).first()

    if user and bcrypt.check_password_hash(user.password_hash, data.get('password')):
        session["user_id"] = user.id
        print("success")

        return user.to_dict(), 200
    else:
        return {"error": "Invalid username or password"}, 401






if __name__ == '__main__':
    app.run(port=5555, debug=True)