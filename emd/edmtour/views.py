from django.shortcuts import render,get_object_or_404
from models import albums
from django.http import HttpResponse,JsonResponse
import json
from django.core import serializers as s
from django.contrib.postgres.search import  SearchVector

def songs(request):
    songs=albums.objects.all()
    return  render(request,"songs.html",{"songs":songs})
# Create your views here.
def download(request,songid):
    songid=int(songid)
    song=get_object_or_404(albums,id=songid)
    song.downloads+=1
    song.save()
    f=open(song.music_upload.path,'rb')
    response= HttpResponse(f,content_type="audio/mpeg")
    response['Content-Disposition']='attachment;filename='+song.music_upload.name
    return response
def like(request):    
    likeid=request.GET["likeid"]
    song=get_object_or_404(albums,id=likeid)
    song.likes+=1
    print song.likes
    song.save()
    return HttpResponse("")
def top(request):
    songs=albums.objects.order_by("-downloads");
    return  JsonResponse(s.serialize("json",songs),safe=False);

def mliked(request):
    songs=albums.objects.order_by("-likes");
    return  JsonResponse(s.serialize("json",songs),safe=False);
def search(request):     
    searching=albums.objects.annotate(search=SearchVector('album_name','artist','genre')).filter(search=request.GET["search"])
    return  JsonResponse(s.serialize("json",searching),safe=False);
def charts(request):
    songs=albums.objects.order_by("-downloads","-likes")
    return  JsonResponse(s.serialize("json",songs),safe=False);
            
