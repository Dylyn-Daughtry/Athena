from django.db import models
from student.models import Student
from tutor.models import Tutor

class Reviews(models.Model):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    tutor = models.ForeignKey(Tutor, on_delete=models.CASCADE)
    text = models.CharField(max_length=255)
    