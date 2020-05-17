import subprocess
from django import forms
from django.views import View
from django.http import JsonResponse
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
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

class CrawlerExecutionValidationForm(forms.Form):
    start_date = forms.CharField()
    end_date = forms.CharField()

p_crawler = None  # Global variable used in CrawlerView to execute crawler only one
@method_decorator(csrf_exempt, name="dispatch")
class CrawlerExecutionView(View):
    def get(self, request):
        global p_crawler
        if p_crawler != None and p_crawler.poll() == None:
            return JsonResponse({"msg": "already executed wait till ending of the process"}, status=226)
        else:
            return JsonResponse({"msg": "ready to execute"}, status=200)

    def post(self, request):
        form = CrawlerExecutionValidationForm(request.POST)

        if not form.is_valid():
            return JsonResponse({"msg": "Bad request"}, status=400)

        global p_crawler

        if p_crawler != None:
            if p_crawler.poll() == None:
                return JsonResponse({"msg": "already executed wait till ending of the process"}, status=226)
            else:
                p_crawler = None
        proc_params = ["python", "../crawler/crawler.py"]
        proc_params.extend([request.POST["start_date"], request.POST["end_date"]])
        p_crawler = subprocess.Popen(
            proc_params, stdout=subprocess.PIPE)

        return JsonResponse({"msg": "success to execute"}, status=202)