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
from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
from blog.upload import upload_image
from resume import views
# from demo.views import
urlpatterns = [
    url(r"^uploads/(?P<path>.*)$", \
                "django.views.static.serve", \
                {"document_root": settings.MEDIA_ROOT,}),
    url(r'^admin/upload/(?P<dir_name>[^/]+)$', upload_image, name='upload_image'),
    url(r'^admin', include(admin.site.urls)),
    # 简历
    url(r'^resume/', views.resume,name="简历"),
    url(r'^resume_mobile/', views.resume_mobile,name="手机简历"),
    url(r'^resume_pc/', views.resume_pc,name="手机简历"),
    url(r'^m', views.phone,name="移动端简历"),

    url(r"^demo/(?P<name>[^/]+)/$", "demo.views.demo"),
    url(r"^about", "blog.views.about"),
    url(r'^$', views.resume,name="简历"),
    # demo 分发
    url(r'^', include('blog.urls')),
    url(r'^test',"demo.views.test_ajax", name='test'),
    # url(r'^test',"demo.views.test", name='test'),
#     文件下载
    url(r"^download/(?P<name>[^/]+)$", "demo.views.file_download", name="下载"),

]

