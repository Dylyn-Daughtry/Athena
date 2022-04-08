from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

User = get_user_model()

class Student(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    school = models.CharField(max_length=100)
    grade = models.IntegerField()
    about_me = models.CharField(max_length=500)