from django.urls import path
from . import views

app_name = 'trackers'
urlpatterns = [
    path('', views.home, name='home')
]