from django.conf.urls import url
from views import *
urlpatterns=[
    url(r'^$',songs,name="songs"),
    url(r'^edm/(?P<songid>\d+)$',download,name="download"),
    url(r'^like$',like,name="like"),
    url(r'^topdownloads$',top,name="top"),
    url(r'^mostliked$',mliked,name="mliked"),
    url(r'^search$',search,name="search"),
     url(r'^charts$',charts,name="charts"),
]
