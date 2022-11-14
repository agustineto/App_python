from flask import Blueprint, render_template, request, flash, redirect, url_for
from flask_login import login_user, logout_user, login_required, current_user
from .forms import LoginForm, RegisterForm
from .models import User
from . import login_manager

page = Blueprint('page', __name__)

@login_manager.user_loader
def load_user(id):
    return User.get_by_id(id)

@page.route('/')
def index():
    return render_template('index.html', title='Index')

@page.route('/solicitud')
@login_required
def solicitud():
    return render_template('auth/solicitud.html', title='Solicitud')

@page.route('/login', methods=['GET', 'POST'])
def login():
    form = LoginForm(request.form)

    if current_user.is_authenticated:
        return redirect(url_for('.solicitud'))

    if request.method == 'POST' and form.validate():
        user = User.get_by_username(form.username.data)
        if user and user.verify_password(form.password.data):
            # flash('Usuario correcto')
            login_user(user)
             
            return redirect(url_for('.solicitud'))
        else:
            flash('Usuario o contraseña invalidos.', 'error')

    if request.method == 'GET':
        print("Mostrando formulario")

    return render_template('auth/login.html', title='Login', form=form)

@page.route('/logout')
def logout():
    logout_user()
    flash('Cerraste sesión')
    return redirect(url_for('.login'))

@page.route('/register', methods=['GET', 'POST'] )
def register():
    form = RegisterForm(request.form)

    if current_user.is_authenticated:
        return redirect(url_for('.solicitud'))

    if request.method == 'POST' and form.validate():
        user = User.create_user(form.username.data, form.password.data, form.email.data, )
        # flash('Usuario registrado exitosamente.')
        login_user(user)
        return redirect(url_for('.solicitud'))

    return render_template('auth/register.html', title='Register', form=form)



@page.app_errorhandler(404)
def page_not_found(error):
    return render_template('errors/404.html'), 404 