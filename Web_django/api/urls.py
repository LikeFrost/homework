from django.urls import path

from api import views

urlpatterns = [
    path('user/register', views.register.as_view()),
    path('user/login',views.login.as_view()),
    path('picture', views.pics.as_view()),
    path('picture/history',views.picHistory.as_view()),
]
