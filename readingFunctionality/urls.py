from django.urls import path

from .views import  *


urlpatterns = [
    path('',home,name='home'),
    path('fileChange',fileChange,name="fileChange"),
    path('get/translation',translate,name="translate")

]