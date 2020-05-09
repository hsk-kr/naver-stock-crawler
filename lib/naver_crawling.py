import requests
from bs4 import BeautifulSoup

from .log import log

# urls
KOSPI_SISE_FALL_URL = "https://finance.naver.com/sise/sise_fall.nhn?sosok=0"
KOSDAQ_SISE_FALL_URL =  "https://finance.naver.com/sise/sise_fall.nhn?sosok=1"
TRADING_TREND_URL = "https://finance.naver.com/item/frgn.nhn?code={0}&page={1}"

def get_source_from_url(url, encoding="euc-kr"):
    """
        Returns webpage source from url. It uses 'euc-kr' as default encoding.
    """
    res = requests.get(url)
    res.encoding = encoding
    return res.text


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
        log("type: {} Parsing... {}".format(type, idx))
        
        columns = row.find_all("td")
        
        # ignore divider
        if len(columns) != 12:
            continue

        link = columns[1].find("a")

        stock_name = link.text.strip()
        stock_code = link["href"][link["href"].find("code=") + len("code="):]
        stock_link = STOCK_DETAIL_URL.format(link["href"])

        stock_list.append({
            "name": stock_name,
            "code": stock_code,
            "link": stock_link
        })

    log("type: {} Parsing Done".format(type))
    
    return stock_list
