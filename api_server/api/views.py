import rest_framework
from rest_framework import viewsets

from .models import Stock, Crawler, Log

from .serializers import (
    CrawlerSerializer,
    LogSerializer,
    StockSerializer,
)


class StockViewSet(viewsets.ModelViewSet):
    serializer_class = StockSerializer
    queryset = Stock.objects.all()


class CrawlerViewSet(viewsets.ModelViewSet):
    serializer_class = CrawlerSerializer
    queryset = Crawler.objects.all()


class LogViewSet(viewsets.ModelViewSet):
    serializer_class = LogSerializer
    queryset = Log.objects.all()
