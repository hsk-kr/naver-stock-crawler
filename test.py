from lib.naver_crawling import obtain_stocks

if __name__ == "__main__":
    stocks = obtain_stocks("kospi")
    print(stocks)
    # stocks = obtain_stocks("kosdaq")
    # print(stocks)