from django.contrib import admin
from django.utils.html import format_html
from .models import Crawler, Log, Stock

class CrawlerAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "created_at",
    )


class StockAdmin(admin.ModelAdmin):
    list_display = (
        "crawler_id",
        "name",
        "code",
        "link_href",
        "trading_trend",
        "analyzed_data",
        "analyzed_data_probability",
        "created_at",
    )

    def crawler_id(self, obj):
        return obj.crawler.tid

    crawler_id.short_description = "crawler"

    def link_href(self, obj):
        return format_html(
            "<a href={url} target='_blank'>OPEN</a>", url=obj.link
        )

    link_href.short_description = "link"


class LogAdmin(admin.ModelAdmin):
    list_display = (
        "crawler_id",
        "message",
        "created_at",
    )

    def crawler_id(self, obj):
        return obj.crawler.id

    crawler_id.short_description = "crawler"

admin.site.register(Crawler, CrawlerAdmin)
admin.site.register(Log, LogAdmin)
admin.site.register(Stock, StockAdmin)
