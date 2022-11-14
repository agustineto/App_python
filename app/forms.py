from wtforms import Form

from wtforms import validators
from wtforms import StringField, PasswordField
from wtforms.fields import EmailField, BooleanField
from .models import User

class LoginForm(Form):
    username = StringField('Usuario: ', [
        validators.length(min=3, max=50, message='El usuario debe ser mayor a 3 caracteres.')
    ])
    password = PasswordField('Contraseña: ', [
        validators.InputRequired(message='Campo obligatorio'),
        validators.length(min=5, message='La contraseña debe tener más de 4 caracteres.')
    ])


class RegisterForm(Form):
    username = StringField('Usuario: ', [
        validators.length(min=3, max=50)
    ])

    email = EmailField('Correo electrónico', [
        validators.length(min=6, max=100),
        validators.InputRequired(message='Campo obligatorio.'),
        validators.Email('Email', [validators.DataRequired(), validators.Email()])
    ])

    password = PasswordField('Contraseña: ', [
        validators.InputRequired(message='Contraseña necesaria'),
        validators.EqualTo('confirm_password', message='Las contraseñas no coinciden.')
    ])

    confirm_password = PasswordField('Confirmar contraseña: ')

    accept = BooleanField('', [
        validators.DataRequired()
    ])

    #VALIDACION DE CAMPOS POR METODOS
    def validate_username(self, username):
        if User.get_by_username(username.data):
            raise validators.ValidationError('El username ya se encuentra en uso.')

    def validate_email(self, email):
        if User.get_by_username(email.data):
            raise validators.ValidationError('El correo electrónico ya se encuentra en uso.')


    def validate(self):
        if not Form.validate(self):
            return False
 
        return True