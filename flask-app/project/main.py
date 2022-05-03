from flask import Blueprint, render_template, send_file
from flask_login import login_required, current_user

main = Blueprint('main', __name__)


@main.route('/', defaults={'path': ''})
@main.route('/<path:path>')
def index(path):
    return render_template('index.html')


@main.route('/api/generate', methods=['POST'])
def generate():
    return send_file('auth.py', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')


@main.route('/profile')
@login_required
def profile():
    return render_template('profile.html', name=current_user.name)
