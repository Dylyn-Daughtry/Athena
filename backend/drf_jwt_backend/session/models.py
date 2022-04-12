from django.db import models
from django.db.models import Model
from student.models import Student
from tutor.models import Tutor

class Session(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE)
    subject = models.CharField(max_length=50)
    date = models.DateTimeField(auto_now_add=True)
    