from __future__ import unicode_literals

from django.db import models

class albums(models.Model):
    genre=models.CharField(max_length=15,blank=True)
    album_name=models.CharField(max_length=20)
    artist=models.CharField(max_length=25)
    downloads=models.IntegerField(default=0)
    upload_date=models.DateTimeField(auto_now_add=True)
    likes=models.IntegerField(default=0)
    music_upload=models.FileField(default=None)
    album_pic=models.ImageField(default=None)


# Create your models here.
