from django.contrib import admin
from api import models

# Register your models here.
from api.models import *


class userAdmin(admin.ModelAdmin):
    search_fields = ('id',)
    list_display = ('id','password')
    pass
admin.site.register(User,userAdmin)

class picAdmin(admin.ModelAdmin):
    search_fields = ('parent',)
    list_display = ('img','state','parent')
    pass
admin.site.register(Pic,picAdmin)