from random import randint, choice as rc

from faker import Faker

from app import app
from models import db, User, Connection, Meme, Response
from flask_bcrypt import Bcrypt
# Authentication

fake = Faker()

if __name__ == '__main__':

    # Authentication with bcrypt

    with app.app_context():
        bcrypt = Bcrypt(app)
        print("Clearing db...")
        User.query.delete()
        Connection.query.delete()
        Meme.query.delete()
        Response.query.delete()

#seed users
        new_users = []
        # Inside the loop where you seed users
        for _ in range(20):
            new_user = User(user_name=fake.name(), password=fake.name())
            password_hash = bcrypt.generate_password_hash(new_user.password)
            new_user.password_hash = password_hash
            db.session.add(new_user)
            new_users.append(new_user)


#seed connections
        conected_options = [True, False]
        new_friends = []
        for _ in range(20):

            requestee_id = randint(1, 20)
            acceptee_id = randint(1, 20)
            while acceptee_id == requestee_id:
                acceptee_id = randint(1, 20)

            new_connection = Connection(status = rc(conected_options), requestee_id = requestee_id, acceptee_id = acceptee_id)
            db.session.add(new_connection)
            new_friends.append(new_connection)
        db.session.commit()

#seed memes
        new_memes = []
        for x in range(21):
            new_meme = Meme(
                caption = fake.sentence(), 
                img_url = 'https://cdn.britannica.com/19/213119-050-C81C786D/Grumpy-Cat-2015-memes.jpg', 
                creator_id = x)
            
            db.session.add(new_meme)
            new_memes.append(new_meme)
        db.session.commit()

#seed responses
        responses = []
        for _ in range(20):
            creator_id = randint(1, 20)
            meme = Meme.query.filter(Meme.creator_id == creator_id).first()
            friends_list = Connection.query.filter(Connection.requestee_id == creator_id).all()
            for connection in range(len(friends_list)):
                new_response = Response(meme_id = meme.id, contestant_id = friends_list[connection].id, response = fake.sentence(), score = randint(0, 5))
                db.session.add(new_response)
                responses.append(new_response)
        db.session.commit()

        print("Seeding complete..")
