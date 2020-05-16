from datetime import datetime

def get_datetime_str():
    """
        Returns datetime string formatted '%Y%m%d%H%M%S'
    """
    return datetime.now().strftime("%Y%m%d%H%M%S")

def convert_str_to_datetime(strdt, format="%Y.%m.%d"):
    """
        Convert string to datetime and returns it
    """
    return datetime.strptime(strdt, format)


def convert_str_to_float(str):
    """
        Convert string to float.
        If the number has commas, will delete them.
    """
    return float(str.replace(",", ""))


def convert_datetime_to_str(datetimeobj, format="%Y.%m.%d"):
    """
        Convert datetime object to string.
    """
    return datetimeobj.strftime(format)


def get_datetime_now():
    """
        Return datetiem.now()
    """
    return datetime.now()