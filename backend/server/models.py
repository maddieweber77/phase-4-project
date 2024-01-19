from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy_serializer import SerializerMixin

metadata = MetaData(naming_convention={
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
})

db = SQLAlchemy(metadata=metadata)

friend_connetion = db.Table(
    'friend_connetions', metadata,
    db.Column('requester_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('acceptee_id', db.Integer, db.ForeignKey('users.id'), primary_key=True),
    db.Column('friend_status', db.Integer)
)

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key = True)
    user_name = db.Column(db.String, nullable = False)
    password = db.Column(db.String, nullable = False)
    profile_picture = db.Column(db.String, default = 'https://i.pinimg.com/736x/87/14/55/8714556a52021ba3a55c8e7a3547d28c.jpg')

    friends = db.relationship('User', secondary = friend_connetion,
                              primaryjoin=id==friend_connetion.c.requester_id,
                              secondaryjoin=id==friend_connetion.c.acceptee_id
                              )
    
class Status(db.Model, SerializerMixin):
    