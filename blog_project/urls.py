"""blog_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.8/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Add an import:  from blog import urls as blog_urls
    2. Add a URL to urlpatterns:  url(r'^blog/', include(blog_urls))
"""
from django.views.generic.base import RedirectView
from django.views.static import serve
from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
from blog.upload import upload_image
from blog.views import about
from resume import views
from demo.views import demo, test_ajax, trex, trexUpload ,trexRank
from tool.views import img2base64, img2base64_upload
# from demo.views import
urlpatterns = [
    url(r'^favicon.ico$',RedirectView.as_view(url=r'static/favicon.ico')),
    url(r"^uploads/(?P<path>.*)$", \
                serve, \
                {"document_root": settings.MEDIA_ROOT,}),
    url(r'^admin/upload/(?P<dir_name>[^/]+)$', upload_image, name='upload_image'),
    url(r'^admin', include(admin.site.urls)),
    # 简历
    url(r'^resume/', views.resume,name="简历"),
    url(r'^resume_mobile/', views.resume_mobile,name="手机简历"),
    url(r'^resume_pc/', views.resume_pc,name="手机简历"),
    url(r'^m', views.phone,name="移动端简历"),

    url(r"^demo/(?P<name>[^/]+)/$", demo),
    url(r"^demo/(?P<name>ife/[^/]+)/$", demo),
    url(r"^about", about),
    url(r'^$', views.resume,name="简历"),
    # demo 分发
    url(r'^', include('blog.urls')),
    url(r'^test',test_ajax, name='test'),
    # url(r'^test',"demo.views.test", name='test'),
#     文件下载
#     url(r"^download/(?P<name>[^/]+)$", "demo.views.file_download", name="下载"),

    url(r"tool/$",img2base64),
    url(r"tool/img2base64/$",img2base64_upload),
    # url(r"tool/(?P<url>.*)","tool.views.img2base")

#     小恐龙trex
    url(r"^trex/$",trex),
    url(r"trex/uploadStorage/$",trexUpload),
    url(r"trex/rank/$",trexRank)


]

