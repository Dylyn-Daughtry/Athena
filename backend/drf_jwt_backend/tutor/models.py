from django.db import models
from django.contrib.auth import get_user_model
# Create your models here.

User = get_user_model()

class Tutor(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    rates = models.IntegerField()
    availability = models.CharField(max_length=100)
    subjects = models.CharField(max_length=100)