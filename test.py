from lib.naver_crawling import obtain_stocks, obtain_trading_trend_from_stocks

if __name__ == "__main__":
    stocks = obtain_stocks("kospi")
    # print(stocks)
    stocks = obtain_trading_trend_from_stocks(stocks, end_date="2020.05.01")
    print(stocks)
    # stocks = obtain_stocks("kosdaq")
    # print(stocks)