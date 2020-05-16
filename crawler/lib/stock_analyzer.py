from .format import get_datetime_now


def analyze_stock_trading_trend(stocks):
    """
    Analyze stock's trading trends
    It appends analyzed data to stocks list then returns it.
    
    Return :
    [
        {
            ...
            "analyzed_data": [
                {
                    "result": None | {
                        "type": "rise" | "fall",
                        "closing_price": float,
                        "institution": float,
                        "foreigner": float,
                        "date": str
                    },
                    'date": str,
                    "closing_price": float,
                    "institution": float,
                    "foreigner": float
                }
            ]
        }
    ]
    """
    new_stocks = stocks[:]
    now = get_datetime_now()

    for stock in stocks:
        trading_trend = stock["trading_trend"]
        analyzed_data = []

        for idx, info in enumerate(trading_trend):
            if info["institution"] > 0 and info["foreigner"] > 0:
                if idx == 0:
                    analyzed_data.append(
                        {
                            "result": None,
                            "date": info["date"],
                            "closing_price": info["closing_price"],
                            "institution": info["institution"],
                            "foreigner": info["foreigner"],
                        }
                    )
                else:
                    next_day_info = trading_trend[idx - 1]

                    if next_day_info["closing_price"] > info["closing_price"]:
                        type = "rise"
                    elif next_day_info["closing_price"] < info["closing_price"]:
                        type = "fall"
                    else:
                        type = "neutrality"

                    analyzed_data.append(
                        {
                            "result": {
                                "type": type,
                                "closing_price": next_day_info["closing_price"],
                                "institution": next_day_info["institution"],
                                "foreigner": next_day_info["foreigner"],
                                "date": next_day_info["date"],
                            },
                            "date": info["date"],
                            "closing_price": info["closing_price"],
                            "institution": info["institution"],
                            "foreigner": info["foreigner"],
                        }
                    )

        stock["analyzed_data"] = analyzed_data
    return new_stocks


def calculate_analyzed_data_probability(stocks):
    """
        It calculates rise or fall or neutrality probability of trading trends of stocks that
        and then append "analyzed_data_probability" to stocks then returns it

        Return :
        [
            {
                ...
                "analyzed_data_probability": [
                    {
                        "result": None | {
                            "type": "rise" | "fall",
                            "closing_price": float,
                            "institution": float,
                            "foreigner": float,
                            "date": string
                        },
                        'date": string,
                        "closing_price": float,
                        "institution": float,
                        "foreigner": float
                    }
                ]
            }
        ]
    """
    new_stocks = stocks[:]

    for stock in stocks:
        rise = 0
        fall = 0
        neutrality = 0

        analyzed_data = stock["analyzed_data"]

        for data in analyzed_data:
            if data["result"] == None:
                continue

            if data["result"]["type"] == "rise":
                rise += 1
            elif data["result"]["type"] == "fall":
                fall += 1
            else:
                neutrality += 1

        rise_probability = rise / (rise + fall + neutrality) * 100 if rise > 0 else 0
        fall_probability = fall / (rise + fall + neutrality) * 100 if fall > 0 else 0
        neutrality_probability = (
            neutrality / (rise + fall + neutrality) * 100 if neutrality > 0 else 0
        )

        stock["analyzed_data_probability"] = {
            "rise": rise,
            "fall": fall,
            "neutrality": neutrality,
            "rise_probability": rise_probability,
            "fall_probability": fall_probability,
            "neutrality_probability": neutrality_probability,
        }

    return new_stocks
