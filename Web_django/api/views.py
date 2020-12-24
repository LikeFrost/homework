from django.contrib.postgres import serializers
from django.db.models.fields import json
from django.http import JsonResponse, HttpResponse
from django.shortcuts import render
from django.utils import timezone
from django.views import View
from django.views.decorators.http import require_http_methods
from requests import Response
from rest_framework.views import APIView
from rest_framework import serializers
from . import models
from .models import *
from django.forms import ModelForm
import json
from ctypes import *
import ctypes
import os
import time
import base64
from django.forms.models import model_to_dict

pDll=ctypes.CDLL("C:\\Users\\13422\\Desktop\\Web\\Web_django\\api\\Web_repair.dll")

class register(APIView):
    def post(self, request):
        id = request.POST.get('id')
        password = request.POST.get('password')
        try:
            user = User.objects.get(id=id)
            if user:
                return JsonResponse({'code': 202, 'status': True, 'data': id})
        except:
            user = User.objects.create(id=id, password=password)
            user.save()
            return JsonResponse({'code': 200, 'status': True, 'data': id})


class login(APIView):
    def post(self, request):
        id = request.POST.get('id')
        password = request.POST.get('password')
        try:
            user = User.objects.get(id=id)
            if user:
                if user.password == password:
                    return JsonResponse({'code': 200, 'status': True, 'data': id})
                else:
                    return JsonResponse({'code': 201, 'status': False, 'data': id})
        except:
            return JsonResponse({'code': 202, 'status': False, 'data': id})


class pics(APIView):
    def post(self, request):
        parent = request.POST.get('parent')
        state = request.POST.get('state')
        date = request.POST.get('date')
        img = request.FILES.get('file')
        pic = Pic(img=img, state=state, parent=parent, time=date)
        pic.save()
        img_name = img.name
        print(img_name)
        str = "C:\\Users\\13422\\Desktop\\Web\\Web_django\\media\\img\\"+img_name
        cp = create_string_buffer(str.encode('gbk'), len(str))
        pDll.mainn(cp)
        return HttpResponse(200)

    def get(self,request):
        try:
            respath = "C:\\Users\\13422\\Desktop\\Web\\Web_django\\n.jpg"
            with open(respath, 'rb') as f:
                base64_data = base64.b64encode(f.read())
                s = base64_data.decode()
            return HttpResponse(s)
        except:
            return HttpResponse('error')

class picHistory(APIView):
    def post(self,request):
        parent = request.POST.get('id')
        message = Pic.objects.filter(parent=parent)
        res =[]
        for c in message:
            respath = "C:\\Users\\13422\\Desktop\\Web\\Web_django\\media\\" +str(c.img)
            print(respath)
            with open(respath, 'rb') as f:
                base64_data = base64.b64encode(f.read())
                s = base64_data.decode()
            res.append({'parent':c.parent,'time':c.time,'name':str(c.img),'imgURL':'data:image/jpg;base64,'+s})
        if parent:
            return JsonResponse({'code':200,'data':res})
        else:
            return HttpResponse('323')