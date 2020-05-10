from lib.naver_crawling import obtain_stocks, obtain_trading_trend_from_stocks
from lib.stock_analyzer import analyze_stock_trading_trend, calculate_analyzed_data_probability

if __name__ == "__main__":
    stocks = obtain_stocks("kospi")
    stocks = obtain_trading_trend_from_stocks(stocks, end_date="2020.01.01")
    stocks = analyze_stock_trading_trend(stocks)
    stocks = calculate_analyzed_data_probability(stocks)

    rise = 0
    fall = 0
    for stock in stocks:
        rise += stock["analyzed_data_probability"]["rise"]
        fall += stock["analyzed_data_probability"]["fall"]
    
    print("kospi rise:{} fall:{}".format(rise, fall))
    
    stocks = obtain_stocks("kosdaq")
    stocks = obtain_trading_trend_from_stocks(stocks, end_date="2020.01.01")
    stocks = analyze_stock_trading_trend(stocks)
    stocks = calculate_analyzed_data_probability(stocks)

    rise = 0
    fall = 0
    for stock in stocks:
        rise += stock["analyzed_data_probability"]["rise"]
        fall += stock["analyzed_data_probability"]["fall"]
    
    print("kosdaq rise:{} fall:{}".format(rise, fall))

