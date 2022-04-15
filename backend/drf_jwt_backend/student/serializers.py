from.models import Student
from rest_framework import serializers
from authentication.serializers import NestedUserSerializer

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['user', 'school', 'grade', 'major', 'about_me', 'id']

class NestedStudentSerializer(serializers.ModelSerializer):
    user = NestedUserSerializer()
    class Meta:
        model = Student
        fields = ['user', 'school', 'grade', 'major', 'about_me', 'id']