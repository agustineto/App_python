import datetime

from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


from . import db



class User(db.Model, UserMixin):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), unique=True, nullable=False)
    encrypted_password = db.Column(db.String(200), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    create_at = db.Column(db.DateTime, default=datetime.datetime.now())

    def verify_password(self, password):
        return check_password_hash(self.encrypted_password, password)

    @property
    def password(self):
        pass

    @password.setter
    def password(self, value):
        self.encrypted_password = generate_password_hash(value)

    def  __str__(self):
        return self.username


    @classmethod
    def create_user(cls, username, password, email):
        user = User(username=username, password=password, email=email)
        db.session.add(user)
        db.session.commit()
        return user

    @classmethod
    def get_by_username(cls, username):
        return User.query.filter_by(username=username).first()

    @classmethod
    def get_by_user(cls, username, password):
        return User.query.filter_by(username=username, password=password).first()

    @classmethod
    def get_by_id(cls, id):
        return User.query.filter_by(id=id).first()


class Solicitud(db.Model):
    __tablename__ = 'solicitudes'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    estatus = db.Column(db.Integer, nullable=False)
    monto_aprobado = db.Column(db.Integer, nullable=False)
    plazo_a_pagar = db.Column(db.Integer, nullable=False)
    pago_mensual = db.Column(db.Integer, nullable=False)
    creacion_solicitud = db.Column(db.DateTime, default=datetime.datetime.now())