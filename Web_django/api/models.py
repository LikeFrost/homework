from django import db
from django.db import models


# Create your models here.

class User(models.Model):
    id = models.CharField(primary_key=True, verbose_name='用户名', max_length=32)
    password = models.CharField(verbose_name='密码', max_length=32)

    class Meta:
        verbose_name_plural = '用户表'
        verbose_name = '用户'
        db_table = 'api_user'


class Pic(models.Model):
    img = models.ImageField(upload_to='img',null = True)
    state = models.CharField(verbose_name='状态',max_length=64)
    parent = models.CharField(verbose_name='用户',max_length=64)
    time = models.CharField(verbose_name='时间',max_length=64)

    class Meta:
        verbose_name_plural = '图片表'
        verbose_name = '图片'
        db_table = 'api_picture'

#class History(models.Model):
    #date = models.DateField(verbose_name='日期',max_length=64)
    #commits = models.CharField(verbose_name='提交数',max_length=64)
    #month = models.CharField(verbose_name= '月份',max_length=64)
