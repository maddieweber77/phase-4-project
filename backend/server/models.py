from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)


class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    user_name = db.Column(db.String, nullable = False)
    password_hash = db.Column(db.String)
    profile_picture = db.Column(db.String, default = 'https://i.pinimg.com/736x/87/14/55/8714556a52021ba3a55c8e7a3547d28c.jpg')

    memes = db.relationship('Meme', back_populates = 'user', cascade = 'all, delete-orphan')
    captions = db.relationship('Caption', back_populates = 'user', cascade = 'all, delete-orphan')

    serialize_rules = ['-memes.user', '-memes.captions', '-caption.meme', '-caption.user']


    def __repr__(self):
        return f'<User {self.id}>'

class Meme(db.Model, SerializerMixin):
    __tablename__ = 'memes'

    id = db.Column(db.Integer, primary_key = True)
    img_url = db.Column(db.String)
    description = db.Column(db.String)
    accepting_captions = db.Column(db.Boolean, default = True)
    winning_caption = db.Column(db.Integer, nullable = True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    user = db.relationship('User', back_populates = 'memes')
    captions = db.relationship('Caption', back_populates = 'meme', cascade = 'all, delete-orphan')

    serialize_rules = ['-user.memes', '-user.captions', '-captions.meme', '-captions.user']

    def __repr__(self):
        return f'<Meme {self.id}>'
    
class Caption(db.Model, SerializerMixin):
    __tablename__ = 'captions'
    
    id = db.Column(db.Integer, primary_key = True)
    entry = db.Column(db.String, nullable = False)
    meme_id = db.Column(db.Integer, db.ForeignKey('memes.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    meme = db.relationship('Meme', back_populates = 'captions')
    user = db.relationship('User', back_populates = 'captions')

    serialize_rules = ['-meme.user', '-meme.captions', '-user.memes', '-user.captions']

    def __repr__(self):
        return f'<Caption {self.id}>'





