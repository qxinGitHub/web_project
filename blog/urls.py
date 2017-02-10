from django.conf.urls import url
from blog import views

urlpatterns = [
    # url(r'^$', a, name='a'),
    url(r'^blog/$', views.index, name='index'),
    url(r'^index/$', views.index, name='index'),
    url(r'^archive/$', views.archive, name='archive'),
    url(r'^article/$', views.article, name='article'),
    url(r'^comment/post/$', views.comment_post, name='comment_post'),
    url(r'^logout$', views.do_logout, name='logout'),
    url(r'^reg', views.do_reg, name='reg'),
    url(r'^login', views.do_login, name='login'),
    url(r'^category/$', views.category, name='category'),
    url(r'^a', views.a, name='a'),
    # url(r'^test', views.test, name='test'),
    # url(r"^about", views.about, name="about"),
]
