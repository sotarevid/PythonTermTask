import datetime
import requests

from .models import DayOff
from . import db, app


def data_year(year):
    url = "https://isdayoff.ru/api/getdata?year=" + str(year)
    response = requests.get(url)
    print(response)
    return str(response.content)


def find_weekends(year, data_days):
    months = {1: 31, 2: 28, 3: 31, 4: 30, 5: 31, 6: 30, 7: 31, 8: 31, 9: 30, 10: 31, 11: 30, 12: 31}
    data_pointer = 2

    for month in months:
        for day in range(1, months[month] + 1):
            if int(data_days[data_pointer]) == 1:
                date = datetime.date(year, month, day)
                day_off = DayOff(day=date)
                with app.app_context():
                    db.session.add(day_off)
                    db.session.commit()
            data_pointer += 1


def generate():
    find_weekends(2022, data_year(2022))
