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
        # new_memes = []
        # for _ in range(21):
        #     new_meme = Meme(
        #         description = fake.sentence(), 
        #         img_url = 'https://cdn.britannica.com/19/213119-050-C81C786D/Grumpy-Cat-2015-memes.jpg', 
        #         user_id = 1,
        #         accepting_captions = True
        #         )
        #     db.session.add(new_meme)
        #     new_memes.append(new_meme)
        # for _ in range(21):
        #     new_meme = Meme(
        #         description = fake.sentence(), 
        #         img_url = 'https://cdn.britannica.com/19/213119-050-C81C786D/Grumpy-Cat-2015-memes.jpg', 
        #         user_id = 2,
        #         accepting_captions = True

        #         )
        #     db.session.add(new_meme)
        #     new_memes.append(new_meme)
        # db.session.commit()
            
#seed presentation memes
        user0meme1 = Meme(description = "Name a time you were really sad :(",img_url = "https://i.kym-cdn.com/entries/icons/facebook/000/034/772/Untitled-1.jpg", user_id = 1, accepting_captions = True)
        user0meme2 = Meme(description = "What's bro learning right now",img_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd37lRNC6zoHuuRYEEeeqFSrQ68v7TrjB_qS7jZqR3UOV-SBMWjIaDvL_vrFnf4huywPQ&usqp=CAU", user_id = 1, accepting_captions = True)
        user0meme3 = Meme(description = "What's are you getting busted for",img_url = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSubDUAjBn2gLFVlYD_rc6wWQldHPxVYO3EA&usqp=CAU", user_id = 1, accepting_captions = True)
        user1meme1 = Meme(description = "What's something really dumb?",img_url = "https://a.pinatafarm.com/498x216/364cba970e/retard-0f60f8a3d864459abb1939e76ea61619-meme.jpeg/m/0x215", user_id = 2, accepting_captions = True)
        user1meme2 = Meme(description = "What's stressing Hank out?",img_url = "https://e1.pxfuel.com/desktop-wallpaper/500/316/desktop-wallpaper-high-quality-hank-hill-blank-meme-template.jpg", user_id = 2, accepting_captions = True)
        user1meme3 = Meme(description = "What's Lisa about to go in about?",img_url = "https://www.memestemplates.com/wp-content/uploads/2022/10/lisa-presenting.jpg", user_id = 2, accepting_captions = True)
        db.session.add(user0meme1)
        db.session.add(user0meme2)
        db.session.add(user0meme3)
        db.session.add(user1meme1)
        db.session.add(user1meme2)
        db.session.add(user1meme3)
        db.session.commit()


#seed captions 
        # for _ in range(21):
        #     new_caption = Caption(
        #         entry = fake.sentence(),
        #         meme_id = 1,
        #         user_id = randint(1, 20)
        #     )
        #     db.session.add(new_caption)
        # db.session.commit()

        user0meme1_caption1 = Caption(meme_id = 1, user_id = 5, entry = "Project week at Flatiron School")
        user0meme1_caption2 = Caption(meme_id = 1, user_id = 2, entry = "When it rains for a week straight")
        user0meme1_caption3 = Caption(meme_id = 1, user_id = 2, entry = "When your proxy stops working")
        user0meme2_caption1 = Caption(meme_id = 2, user_id = 2, entry = "How to cheat LeetCode with AI")
        user0meme2_caption2 = Caption(meme_id = 2, user_id = 7, entry = "Cramming before a code test")
        db.session.add(user0meme1_caption1)
        db.session.add(user0meme1_caption2)
        db.session.add(user0meme1_caption3)
        db.session.add(user0meme2_caption1)
        db.session.add(user0meme2_caption2)
        db.session.commit()

        print("Seeding complete..")
