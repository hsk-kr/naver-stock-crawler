from rest_framework import serializers
from .models import Crawler, Log, Stock


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        model = Stock
        fields = "__all__"


class CrawlerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Crawler
        fields = "__all__"


class LogSerializer(serializers.ModelSerializer):
    class Meta:
        model = Log
        fields = "__all__"
