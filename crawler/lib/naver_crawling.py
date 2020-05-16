import requests
from bs4 import BeautifulSoup

# from .log import log
from .format import get_datetime_now, convert_str_to_datetime, convert_str_to_float, convert_datetime_to_str

# urls
KOSPI_SISE_FALL_URL = "https://finance.naver.com/sise/sise_fall.nhn?sosok=0"
KOSDAQ_SISE_FALL_URL = "https://finance.naver.com/sise/sise_fall.nhn?sosok=1"
TRADING_TREND_URL = "https://finance.naver.com/item/frgn.nhn?code={0}&page={1}"
STOCK_DETAIL_URL = "https://finance.naver.com{}"


def get_source_from_url(url, encoding="euc-kr"):
    """
        Returns webpage source from url. It uses 'euc-kr' as default encoding.
    """
    res = requests.get(url)
    res.encoding = encoding
    return res.text

def obtain_trading_trend_from_stocks(
    stocks, start_date=get_datetime_now(), end_date=get_datetime_now()
):
    """
        obtain trading trend from the stocks that obtained by obtain_stoks func.
        
        Args : 
          stocks (list) : stock list that have dicts that have keys {"name", "code", "link}
          start_date (str) : to start parsing from this. it has to be latest datetime that you want to parse from
                              default is today.
          end_date (str|datetime) : to parse till this. 

        Example :
          stocks = obtain_trading_trend_from_stocks(stocks, "2020-04-10", "2020-04-03")

        Return :
        {
            "name": str,
            "code": str,
            "link": str,
            "trading_trend": [{
                "date": string,
                "closing_price", float,
                "volumn": float,
                "institution": float,
                "foreigner": float
            }]
        }
    """
    # Convert string to datetime
    if type(start_date) == str:
        start_date = convert_str_to_datetime(start_date)
    if type(end_date) == str:
        end_date = convert_str_to_datetime(end_date)

    new_stocks = stocks[:]
    stocks_length = len(new_stocks)
    for idx, stock in enumerate(new_stocks):
        page = 1
        trading_trend = []
        loop = True

        while loop:
            url_to_parse = TRADING_TREND_URL.format(stock["code"], page)
            html = get_source_from_url(url_to_parse)
            soup = BeautifulSoup(html, "html.parser")

            table = soup.find(
                "table",
                {"class": "type2", "summary": "외국인 기관 순매매 거래량에 관한표이며 날짜별로 정보를 제공합니다."},
            )
            rows = table.find_all("tr")[2:]  # ignore header rows

            for row in rows:
                columns = row.find_all("td")

                # ignore divider
                if len(columns) != 9:
                    continue

                try:
                    # if there is no data
                    date = convert_str_to_datetime(columns[0].find("span").text.strip())
                except:
                    loop = False
                    break  # if it finishes parsing, end up this loop

                if date > start_date:
                    continue  # ignore because it has to parse more deeply
                elif date < end_date:
                    loop = False
                    break  # if it finishes parsing, end up this loop

                tmp = {
                    "date": convert_datetime_to_str(date),
                    "closing_price": convert_str_to_float(columns[1].find("span").text),
                    "volumn": convert_str_to_float(columns[4].find("span").text),
                    "institution": convert_str_to_float(columns[5].find("span").text),
                    "foreigner": convert_str_to_float(columns[6].find("span").text),
                }

                trading_trend.append(tmp)
            # log(
            #     "parsing trading trend stocks {}/{} page {}".format(
            #         idx + 1, stocks_length, page
            #     )
            # )
            page += 1
        stock["trading_trend"] = trading_trend
    return new_stocks


def obtain_stocks(type):
    """
        Parse stock page and thne obtain stock list from the page then returns it.
        if error occurs, returns None. 

        Args :
          type (str) : "kospi" | "kosdaq"

        Return :
            [
                {
                    "name": str,
                    "code": str,
                    "link": str
                }
            ]
    """
    if type == "kospi":
        url_to_parse = KOSPI_SISE_FALL_URL
    elif type == "kosdaq":
        url_to_parse = KOSDAQ_SISE_FALL_URL
    else:
        print("Unknown Type")
        return None

    html = get_source_from_url(url_to_parse)
    soup = BeautifulSoup(html, "html.parser")

    # ignore header and divider
    rows = soup.find("div", {"class": "box_type_l"}).find("table").find_all("tr")[2:]

    stock_list = []

    for idx, row in enumerate(rows):
        # log("type: {} Parsing... {}".format(type, idx))

        columns = row.find_all("td")

        # ignore divider
        if len(columns) != 12:
            continue

        link = columns[1].find("a")

        stock_name = link.text.strip()
        stock_code = link["href"][link["href"].find("code=") + len("code=") :]
        stock_link = STOCK_DETAIL_URL.format(link["href"])

        stock_list.append({"name": stock_name, "code": stock_code, "link": stock_link})

    # log("type: {} Parsing Done".format(type))

    return stock_list
