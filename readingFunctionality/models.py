from django.db import models
import datetime
# Create your models here.

from userAccount.models import User

#
# class Document(models.Model):
#     document = models.FileField(upload_to='documents/')
#     user = models.ForeignKey(User,on_delete=models.CASCADE)
#     uploaded_at = models.DateTimeField(auto_now_add=True)
#
#
