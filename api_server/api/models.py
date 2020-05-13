from django.utils import timezone

from django.db import models
from django.contrib.postgres.fields import JSONField


class Crawler(models.Model):
    created_at = models.DateTimeField(default=timezone.now)


class Stock(models.Model):
    crawler = models.ForeignKey(Crawler, on_delete=models.CASCADE)
    name = models.CharField(max_length=256)
    code = models.CharField(max_length=20)
    link = models.CharField(max_length=256)
    trading_trend = JSONField()
    analayzed_data = JSONField()
    analyzed_data_probability = JSONField()
    created_at = models.DateTimeField(default=timezone.now)


class Log(models.Model):
    crawler = models.ForeignKey(Crawler, on_delete=models.CASCADE)
    message = models.CharField(max_length=256)
    created_at = models.DateTimeField(default=timezone.now)
