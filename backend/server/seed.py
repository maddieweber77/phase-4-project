from random import randint, choice

from faker import Faker

from app import app
from models import db, User, Caption, Meme
from flask_bcrypt import Bcrypt
# Authentication

fake = Faker()

if __name__ == '__main__':

    # Authentication with bcrypt

    with app.app_context():
        bcrypt = Bcrypt(app)
        print("Clearing db...")
        User.query.delete()
        Caption.query.delete()
        Meme.query.delete()

#seed users
        new_users = []
        # Inside the loop where you seed users
        for i in range(20):
            new_user = User(user_name=str(i))
            password_hash = bcrypt.generate_password_hash('a')
            new_user.password_hash = password_hash
            db.session.add(new_user)
            new_users.append(new_user)

#seed memes
        new_memes = []
        for _ in range(21):
            new_meme = Meme(
                description = fake.sentence(), 
                img_url = 'https://cdn.britannica.com/19/213119-050-C81C786D/Grumpy-Cat-2015-memes.jpg', 
                user_id = 1,
                accepting_captions = True
                )
            db.session.add(new_meme)
            new_memes.append(new_meme)
        for _ in range(21):
            new_meme = Meme(
                description = fake.sentence(), 
                img_url = 'https://cdn.britannica.com/19/213119-050-C81C786D/Grumpy-Cat-2015-memes.jpg', 
                user_id = 2,
                accepting_captions = True

                )
            db.session.add(new_meme)
            new_memes.append(new_meme)
        db.session.commit()

#seed captions 
        for _ in range(21):
            new_caption = Caption(
                entry = fake.sentence(),
                meme_id = 1,
                user_id = randint(1, 20)
            )
            db.session.add(new_caption)
        db.session.commit()

        print("Seeding complete..")
