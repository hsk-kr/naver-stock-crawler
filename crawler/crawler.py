import sys

from lib.naver_crawling import obtain_stocks, obtain_trading_trend_from_stocks
from lib.stock_analyzer import analyze_stock_trading_trend, calculate_analyzed_data_probability
from lib.api import api_log, api_create_crawler, api_create_stocks

if __name__ == "__main__":
    argv_length = len(sys.argv)

    if argv_length == 2:
        start_date = None
        end_date = sys.argv[1]
    elif argv_length == 3:
        start_date = sys.argv[1]
        end_date = sys.argv[2]
    else:
        print('python crawler.py [start_date] [end_date]')
        print('example) python crawler.py 2020.01.01 2020.03.01')
        sys.exit(0)

    crawler = api_create_crawler()
    
    api_log(crawler, "Start. [{0}]-[{1}]".format(end_date, "now" if start_date == None else start_date))

    api_log(crawler, "Starting getting kospi list.")
    kospi_stocks = obtain_stocks("kospi")
    api_log(crawler, "Done getting kospi list.")

    api_log(crawler, "Starting getting kosdaq list.")
    kosdaq_stocks = obtain_stocks("kosdaq")
    api_log(crawler, "Done getting kosdaq list.")

    api_log(crawler, "Starting getting trading trends of kospi stocks.")
    if start_date == None:
        kospi_stocks = obtain_trading_trend_from_stocks(kospi_stocks, end_date=end_date)
    else:
        kospi_stocks = obtain_trading_trend_from_stocks(kospi_stocks, start_date, end_date)
    api_log(crawler, "Done getting trading trends of kospi stocks.")

    api_log(crawler, "Starting getting trading trends of kosdaq stocks.")
    if start_date == None:
        kosdaq_stocks = obtain_trading_trend_from_stocks(kosdaq_stocks, end_date=end_date)
    else:
        kosdaq_stocks = obtain_trading_trend_from_stocks(kosdaq_stocks, start_date, end_date)
    api_log(crawler, "Done getting trading trends of kosdaq stocks.")

    api_log(crawler, "Starting analyzing stocks")
    kospi_stocks = analyze_stock_trading_trend(kospi_stocks)
    kospi_stocks = calculate_analyzed_data_probability(kospi_stocks)
    kosdaq_stocks = analyze_stock_trading_trend(kosdaq_stocks)
    kosdaq_stocks = calculate_analyzed_data_probability(kosdaq_stocks)
    api_log(crawler, "Done analyzing stocks")
        
    api_log(crawler, "Saving stocks into db.")
    api_create_stocks(crawler, kospi_stocks)
    api_create_stocks(crawler, kosdaq_stocks)
    api_log(crawler, "Saved stocks in db.")

    api_log(crawler, "Done.")

