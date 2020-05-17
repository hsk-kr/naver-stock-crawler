from django.urls import include, path
from rest_framework import routers

from .views import (
    StockViewSet,
    CrawlerViewSet,
    LogViewSet,
    CrawlerExecutionView
)

api_router = routers.SimpleRouter()
api_router.register(r"stock", StockViewSet)
api_router.register(r"crawler", CrawlerViewSet)
api_router.register(r"log", LogViewSet)

urlpatterns = [path("", include(api_router.urls)), path("crawler_execution", CrawlerExecutionView.as_view())]
