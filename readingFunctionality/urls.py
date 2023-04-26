from django.urls import path

from .views import  *


urlpatterns = [
    path('',home,name='home'),
    path('upload-doc/',upload_doc,name="upload-doc"),
    path('upload-doc/fileChange',fileChange,name="fileChange"),
    path('upload-doc/upload-doc/get/translation',translate,name="translate-doc-upload"),
    path('guide/',view_guide,name="guide"),
    path('upload-text',upload_text,name="upload-text"),
    path('upload-text/get/translation',translate,name="translate-text-upload"),

]