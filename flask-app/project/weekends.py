import requests
from bs4 import BeautifulSoup


def find_weekends(year):
    url = "https://isdayoff.ru/api/getdata?year=" + year
    response = requests.get(url)
    soup = BeautifulSoup(response.text, 'lxml')
    quotes = soup.find('p')
    weekends = quotes.text
    print(weekends)


YYYY = "2022"
find_weekends(YYYY)
