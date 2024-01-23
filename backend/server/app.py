from flask import Flask, request, session
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
# from flask_bcrypt import Bcrypt
# from dotenv import dotenv_values
from models import db, User, Connection, Meme, Response, Ballot
# config = dotenv_values(".env")


from models import db

app = Flask(__name__)
# # app.secret_key = config['FLASK_SECRET_KEY']
# # NEED SECRET KEY PAGE
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.json.compact = False
# bcrypt = Bcrypt(app)
migrate = Migrate(app, db)

db.init_app(app)

@app.get('/')
def index():
    return "Hello world"

#User Routes
@app.get('/User/<int:id>')
def get_user_by_id(id):
    user = db.session.get(User, id)
    if not user:
        return {"error": "no user with that ID"}, 404
    return user.to_dict(rules = ['-memes', '-responses', '-ballots']), 200

@app.patch('/User/<int:id>')
def patch_user_by_id(id):
    user = db.session.get(User, id)
    if not user:
        return {"error": "no user with that ID"}, 404
    try:
        data = request.json
        for key in data:
            setattr(user, key, data[key])
        db.session.add(user)
        db.session.commit()
        return user.to_dict(rules = ['-memes', '-responses', '-ballots']), 202
    except:
        return { "errors": ["validation errors"] }, 400
    
    #curl -X PATCH -H "Content-Type:application/json" -d '{"user_name": "some name"}' localhost:5555/User/1

@app.post('/User')
def post_new_user():
    try:
        data = request.json
        new_user = User(user_name = data.get("user_name"), password = data.get("password"), password_hash = data.get("password_hash"))
        db.session.add(new_user)
        db.session.commit()
        return new_user.to_dict(rules = ['-memes', '-responses', '-ballots']), 201
    except:
        return { "errors": ["validation errors"] }, 400
    
    #curl -X POST -H "Content-Type:application/json" -d '{"user_name": "testtesttest", "password": "supersafepassword", "password_hash": "temptemptemp"}' localhost:5555/User

@app.delete('/User/<int:id>')
def delete_user_by_id(id):
        user = db.session.get(User, id)
        if not user:
            return {"error": "no user with that ID"}, 404
        db.session.delete(user)
        db.session.commit()
        return {}, 204

    # curl -X DELETE localhost:5555/User/1

#Connection routes 
@app.get('/Connection/User/<int:id>')
def get_connections_by_id(id):
    connections = Connection.query.filter(Connection.acceptee_id == id).all()
    return [c.to_dict(rules = ['-requestee', '-acceptee']) for c in connections], 200

@app.post('/Connection')
def post_new_connection_request():
    try:
        data = request.json
        requester = data.get('requestee_id')
        acceptor = data.get('acceptee_id')
        if Connection.query.filter(Connection.acceptee_id == requester, Connection.requestee_id == acceptor).all():
            return {"error": "open request already pending"}, 400
        new_connection = Connection(requestee_id = requester, acceptee_id = acceptor)
        db.session.add(new_connection)
        db.session.commit()
        return new_connection.to_dict(rules = ['-requestee', '-acceptee']), 201
    except Exception as e:
        print(e)
        return { "errors": ["validation errors"] }, 400
    
    #curl -X POST -H "Content-Type:application/json" -d '{"requestee_id": "1", "acceptee_id": "2"}' localhost:5555/Connection
    #curl -X POST -H "Content-Type:application/json" -d '{"requestee_id": "2", "acceptee_id": "1"}' localhost:5555/Connection

@app.patch('/Connection/<int:id>')
def patch_connection_by_id(id):
    connection = db.session.get(Connection, id)
    if not connection:
        return {"error": "no connection with that ID"}, 404
    try:
        data = request.json
        for key in data:
            setattr(connection, key, data[key])
        db.session.add(connection)
        reciprocal_connection = Connection(status = True, requestee_id = connection.acceptee_id, acceptee_id = connection.requestee_id)
        db.session.add(reciprocal_connection)
        db.session.commit()
        return connection.to_dict(rules = ['-requestee', '-acceptee']), 202
    except:
        return { "errors": ["validation errors"] }, 400
    
    #curl -X PATCH -H "Content-Type:application/json" -d '{"status": true}' localhost:5555/Connection/21
    
@app.delete('/Connection/<int:id>')
def delet_connection_by_id(id):
    connection = db.session.get(Connection, id)
    if not connection:
        return {"error": "no connection with that ID"}, 404
    db.session.delete(connection)
    reciprocal_connection = Connection.query.filter(Connection.requestee_id == connection.acceptee_id, Connection.acceptee_id == connection.requestee_id).first()
    if reciprocal_connection:
        db.session.delete(reciprocal_connection)
    db.session.commit()
    return {}, 204

    # curl -X DELETE localhost:5555/Connection/21

#Meme Routes
@app.get('/Memes/User/<int:id>')
def get_memes_by_creator_id(id):
    memes = []
    for meme in Meme.query.filter(Meme.creator_id == id).all():
        memes.append(meme.to_dict(rules = ['-creator', '-responses']))
    return memes, 200

@app.get('/Memes/<int:id>')
def get_meme_by_id(id):
    meme = db.session.get(Meme, id)
    if not meme:
        return {"error": "no meme with that ID"}, 404 
    return meme.to_dict(rules = ['-creator', '-responses']), 200

@app.post('/Memes')
def post_new_meme():
    try:
        data = request.json
        creator = data.get('creator_id')
        new_meme = Meme(caption = data.get('caption'), img_url = data.get('img_url'), creator_id = creator)
        db.session.add(new_meme)
        db.session.commit()

        connections = Connection.query.filter(Connection.acceptee_id == creator).all()
        for connection in connections:
            new_reponse = Response(meme_id = new_meme.id, contestant_id = connection.id)
            db.session.add(new_reponse)
        db.session.commit()

        return new_meme.to_dict(rules = ['-creator', '-responses']), 201
    except Exception as e:
        print(e)
        return { "errors": ["validation errors"] }, 400
    
    #curl -X POST -H "Content-Type:application/json" -d '{"caption": "Test Test Test", "img_url": "https://i.chzbgr.com/full/5917000192/h596FCF10/lolcats-my-favorite-website", "creator_id": "4"}' localhost:5555/Memes

@app.patch('/Memes/<int:id>')
def patch_meme_by_id(id):
    meme = db.session.get(Meme, id)
    if not meme:
        return {"error": "no meme with that ID"}, 404 
    try:
        data = request.json
        for key in data:
            setattr(meme, key, data[key])
        db.session.add(meme)
        db.session.commit()
        return meme.to_dict(rules = ['-creator', '-responses']), 202
    except:
        return { "errors": ["validation errors"] }, 400
    
    #curl -X PATCH -H "Content-Type:application/json" -d '{"accepting_responses": false}' localhost:5555/Memes/1

@app.delete('/Memes/<int:id>')
def delete_meme_by_id(id):
    meme = db.session.get(Meme, id)
    if not meme:
        return {"error": "no meme with that ID"}, 404
    db.session.delete(meme)
    db.session.commit()
    return {}, 204

    # curl -X DELETE localhost:5555/Memes/22

#Response routes
@app.get('/Responses/<int:id>')
def get_repsponses_by_user_id(id):
    responses = Response.query.filter(Response.contestant_id == id).all()
    return [r.to_dict(rules = ['-meme', '-user', '-ballots']) for r in responses], 200

@app.patch('/Responses/<int:id>')
def patch_response_by_response_id(id):
    response = db.session.get(Response, id)
    if not response:
        return {"error": "no response with that ID"}, 404
    try:
        data = request.json
        for key in data:
            setattr(response, key, data[key])
        db.session.add(response)
        db.session.commit()

        responses = Response.query.filter(Response.meme_id == response.meme_id).all()
        response_count = 0
        for x in responses:
            if not x.response == "":
                response_count += 1
        if response_count == len(responses):
            meme = db.session.get(Meme, response.meme_id)
            meme.accepting_responses = False
            db.session.add(meme)
            db.session.commit()

        return response.to_dict(rules = ['-meme', '-user', '-ballots']), 202
    except Exception as e:
        print(e)
        return { "errors": ["validation errors"] }, 400

    # curl -X PATCH -H "Content-Type:application/json" -d '{"response": "testtesttest"}' localhost:5555/Responses/1



# ***************Authentication GET, POST, and DELETE requests**********************
# @app.get('/check_session')
# def check_session():
#     user = db.session.get(User, session.get(id))
#     # print to check the session object
#     print(session)

#     if user:
#         return user.to_dict(['-password_hash']), 200

#     return {}

# @app.delete('/logout')
# def logout():

#     try: 
#         session.pop(id)
#         return {"Message": "Logged out"}, 200
    
#     except:
#         return {'Message': 'No user logged in'}, 404

# @app.post('/')
# def login():
#     data = request.json

#     user = User.query.filter(User.name == data.get('password')).first()

#     if user and bcrypt.check_password_hash(user.password_hash, data.get('password')):
#         session["user_id"] = user.id
#         print("success")

#         return user.to_dict(), 200
#     else:
#         return {"error": "Invalid username or password"}, 401






if __name__ == '__main__':
    app.run(port=5555, debug=True)