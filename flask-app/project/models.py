from flask_login import UserMixin
from . import db


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    role = db.Column(db.String(6))

    name = db.Column(db.String(100))
    position = db.Column(db.String(100))
    salary_multiplier = db.Column(db.Float)


class AbsenceEntry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    person = db.Column(db.String(100))
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)
    absence_type_number = db.Column(db.String(2))
    absence_type_text = db.Column(db.String(2))


class DayOff(db.Model):
    day = db.Column(db.DateTime, primary_key=True)
