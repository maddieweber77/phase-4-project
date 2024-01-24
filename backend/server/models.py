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
    total_points = db.Column(db.Integer, default = 0)

    memes = db.relationship("Meme", back_populates = 'creator', cascade = 'all, delete-orphan')
    responses = db.relationship("Response", back_populates = 'user', cascade = 'all, delete-orphan')
    ballots = db.relationship('Ballot', back_populates='voter', cascade = 'all, delete-orphan')

    serialize_rules = ['-memes', '-responses', '-password', '-ballots']


class Connection(db.Model, SerializerMixin):
    __tablename__ = "connections"

    id = db.Column(db.Integer, primary_key = True)
    status = db.Column(db.Boolean, default = False)
    requestee_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    acceptee_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    requestee = db.relationship("User", foreign_keys=[requestee_id])
    acceptee = db.relationship("User", foreign_keys=[acceptee_id])


class Meme(db.Model, SerializerMixin):
    __tablename__ = "memes"

    id = db.Column(db.Integer, primary_key = True)
    caption = db.Column(db.String, nullable = False)
    img_url = db.Column(db.String, nullable = False)
    creator_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    accepting_responses = db.Column(db.Boolean, default = True)
    accepting_votes = db.Column(db.Boolean, default = False)


    creator = db.relationship("User", back_populates = 'memes')
    responses = db.relationship('Response', back_populates = 'meme', cascade = 'all, delete-orphan')

    serialize_rules = ['-creator', '-responses']


class Response(db.Model, SerializerMixin):
    __tablename__ = "responses"

    id = db.Column(db.Integer, primary_key = True)
    meme_id = db.Column(db.Integer, db.ForeignKey('memes.id'))
    contestant_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    response = db.Column(db.String, default = "")
    score = db.Column(db.Integer, default = 0)

    meme = db.relationship('Meme', back_populates = 'responses')
    user = db.relationship('User', back_populates = 'responses')
    ballots = db.relationship('Ballot', back_populates = 'response', cascade = 'all, delete-orphan')

    serialize_rules = ['-meme', '-user', 'ballots']

class Ballot(db.Model, SerializerMixin):
    __tablename__ = "ballots"

    id = db.Column(db.Integer, primary_key = True)
    response_id = db.Column(db.Integer, db.ForeignKey('responses.id'))
    voter_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    score = db.Column(db.Integer, default = 0)

    response = db.relationship('Response', back_populates='ballots')
    voter = db.relationship('User', back_populates='ballots')

    serialize_rules = ['-response', '-voter']

