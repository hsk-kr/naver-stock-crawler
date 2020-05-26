import requests

API_ADDRESS = "52.78.84.79"
API_PORT = 8888
API_BASE_URL = "http://{0}:{1}/api".format(API_ADDRESS, API_PORT)
API_CRAWLER_URL = "{0}/crawler/".format(API_BASE_URL)
API_LOG_URL = "{0}/log/".format(API_BASE_URL)
API_STOCK_URL = "{0}/stock/".format(API_BASE_URL)


def api_log(crawler, message):
    """
        Request log API and returns True or False depends on a result of the API
    """
    api_res = requests.post(API_LOG_URL, data={"crawler": crawler, "message": message})

    return api_res.status_code == 201


def api_create_crawler():
    """
        Reqeust create craweler API and then returns an id of the Crawler.
        If it's failed to request the API returns None
    """
    api_res = requests.post(API_CRAWLER_URL)

    if api_res.status_code != 201:
        return None

    data = api_res.json()
    return data["id"]


def api_create_stocks(crawler, stocks):
    for stock in stocks:
        stock["crawler"] = crawler
        requests.post(API_STOCK_URL, json=stock)
