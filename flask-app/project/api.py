import datetime
from flask import Blueprint, request, jsonify, send_file
from werkzeug.security import generate_password_hash, check_password_hash
from .models import AbsenceEntry, DayOff, User
from . import db

api = Blueprint('api', __name__)


@api.route('/api/register', methods=['POST'])
def register():
    body = request.get_json()

    if not body or "fullname" not in body or "email" not in body or "password" not in body:
        return {}, 400

    email = body["email"]
    password = body["password"]
    name = body["fullname"]
    role = body["role"]
    position = body["position"]
    salary = body["salary"]

    user = User.query.filter_by(email=email).first()

    if user:
        return {}, 400

    new_user = User(email=email, name=name,
                    password=generate_password_hash(password, method='sha256'),
                    role=role, position=position, salary_multiplier=salary)

    db.session.add(new_user)
    db.session.commit()

    return {"name": name, "email": email}, 201


@api.route('/api/login', methods=['POST'])
def login_api():
    body = request.get_json()

    if not body or "email" not in body or "password" not in body:
        return {}, 401

    email = body["email"]
    password = body["password"]

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return {}, 401

    return {"token": user.id}, 200


@api.route('/api/get_users', methods=['GET'])
def get_users():
    result = list(
        map(lambda x: {"name": x.name, "id": x.id}, User.query.all()))
    return jsonify(result), 200


@api.route('/api/update', methods=['POST'])
def update():
    body = request.get_json()

    id = body["user_id"]
    start_date = datetime.datetime.strptime(body["start"], "%Y-%m-%d")
    end_date = datetime.datetime.strptime(body["end"], "%Y-%m-%d")
    type = body["type"]

    text_type = "ОТ" if type == "Holiday" else "Б"
    number_type = "09" if type == "Holiday" else "19"

    person = User.query.filter_by(id=id).first().name
    absence = AbsenceEntry(person=person, start_date=start_date,
                           end_date=end_date, absence_type_text=text_type,
                           absence_type_number=number_type)

    db.session.add(absence)
    db.session.commit()

    return {}, 200


@api.route('/api/export', methods=['POST'])
def export():
    return send_file('auth.py', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
