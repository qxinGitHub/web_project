# -*- coding:utf-8 -*-
from django.contrib import admin
from blog.models import *

from django.core.urlresolvers import reverse
from django.utils.html import format_html

# Register your models here.
class ArticleAdmin(admin.ModelAdmin):

    list_display = ('title', 'desc','date_publish', 'click_count',)
    list_display_links = ('title', 'desc', )
    list_editable = ('click_count',)

    fieldsets = (
        (None, {
            'fields': ('title', 'desc', 'content', 'category', 'tag', )
        }),
        ('高级设置', {
            'classes': ('collapse',),
            'fields': ("user", 'click_count', 'is_recommend',)
        }),
    )

    readonly_fields = ("show_url",)
    def show_url(self,instance):
        url = reverse("article_detail", kwargs={"p1":instance.pk})
        response = format_html("""<a href="{0}">文章预览preview</a>""", url)
        return response
    show_url.short_description = u"文章预览"
    show_url.allow_tags = True

    class Media:
        js = (
            '/static/kindeditor/kindeditor.js',
            '/static/kindeditor/lang/zh_CN.js',
            '/static/kindeditor/config.js',
        )


admin.site.register(User)
admin.site.register(Tag)
admin.site.register(Article, ArticleAdmin)
admin.site.register(Category)
admin.site.register(Comment)
admin.site.register(Links)
admin.site.register(Ad)