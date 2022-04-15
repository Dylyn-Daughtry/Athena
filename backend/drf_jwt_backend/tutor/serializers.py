from authentication.serializers import NestedUserSerializer
from.models import Tutor
from rest_framework import serializers

class TutorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tutor
        fields = ['user', 'rates', 'availability', 'subjects', 'id']

class NestedTutorSerializer(serializers.ModelSerializer):
    user = NestedUserSerializer()
    class Meta:
        model = Tutor
        fields = ['user', 'rates', 'availability', 'subjects', 'id']