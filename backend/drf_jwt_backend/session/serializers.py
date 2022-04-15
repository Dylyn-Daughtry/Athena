from rest_framework import serializers
from .models import Session
from student.serializers import NestedStudentSerializer
from tutor.serializers import NestedTutorSerializer

class SessionSerializer(serializers.ModelSerializer):
    student = NestedStudentSerializer()
    tutor= NestedTutorSerializer()
    class Meta:
        model = Session
        fields = ['id', 'student', 'tutor', 'subject', 'date', 'status']

class CreateSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Session
        fields = ['student', 'tutor', 'subject', 'date', 'status']