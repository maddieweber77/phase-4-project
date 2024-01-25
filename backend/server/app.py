from flask import Flask, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from dotenv import dotenv_values
from models import db, User, Meme, Caption

config = dotenv_values(".env")

app = Flask(__name__)
app.secret_key = config['FLASK_SECRET_KEY']
# # NEED SECRET KEY PAGE
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

#User Routes

#Meme Routes
@app.get('/api/memes/<int:id>')
def get_memes_by_creator_id(id):
    user = db.session.get(User, id)
    if not user:
        return {"error", "User not found"}, 404
    memes = Meme.query.filter(Meme.creator_id == id).all()
    return [m.to_dict(0) for m in memes], 200

@app.get('/api/all_open_memes/<int:id>')
def get_all_open_memes_for_a_user(id):
    user = db.session.get(User, id)
    if not user:
        return {"error", "User not found"}, 404
    memes = Meme.query.filter(Meme.creator_id != id, Meme.accepting_captions == True).all()
    return [m.to_dict(0) for m in memes], 200

@app.get('/api/all_finished_memes')
def get_all_finished_memes():
    memes = Meme.query.filter(Meme.accepting_captions == False).all()
    return [m.to_dict(0) for m in memes], 200


@app.post('/api/meme')
def post_new_meme():
    try:
        data = request.json
        new_meme = Meme(img_url = data.get('img_url'), description = data.get('description'), creator_id = data.get('creator_id'))
        db.session.add(new_meme)
        db.session.commit()
        return new_meme.to_dict(), 201
    except:
        return {"error", "validation errors"}, 400
    
@app.patch('/api/meme/<int:id>')
def patch_meme_by_id(id):
    meme = db.session.get(Meme, id)
    if not meme:
         return {"error", "Meme not found"}, 404
    try:
        data = request.json
        for key in data:
            setattr(meme, key, data[key])
        db.session.add(meme)
        db.session.commit()
        return meme.to_dict(), 202
    except:
        return {"error", "validation errors"}, 400
    
#Caption Routes
@app.post('/api/caption')
def create_new_caption():
    try:
        data = request.json
        new_caption= Caption(entry = data.get('entry'), meme_id = data.get('meme_id'), contestant_id = data.get('contestant_id'))
        db.session.add(new_caption)
        db.session.commit()
        return new_caption.to_dict(), 201
    except:
        return {"error", "validation errors"}, 400


# ***************Authentication GET, POST, and DELETE requests**********************
@app.get('/api/check_session')
def check_session():
    user = db.session.get(User, session.get("user_id"))
    # print to check the session object
    print(session)

    if user:
        return user.to_dict(['-password_hash']), 200

    return {}

@app.delete('/api/logout')
def logout():

    try: 
        session.pop("user_id")
        return {"Message": "Logged out"}, 200
    
    except:
        return {'Message': 'No user logged in'}, 404


@app.post('/api/login')
def login():
    
    print("request")
    data = request.json

    user = User.query.filter(User.user_name == data.get('username')).first()
    print(data)
    print(user)
    if user and bcrypt.check_password_hash(user.password_hash, data.get('password')):
        session["user_id"] = user.id
        print("success")

        return user.to_dict(rules=['-password_hash']), 200
    else:
        return {"error": "Invalid username or password"}, 401






if __name__ == '__main__':
    app.run(port=5555, debug=True)