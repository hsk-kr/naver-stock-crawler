from .format import get_datetime_str

def log(msg):
    print("{}: {}".format(get_datetime_str(), msg))