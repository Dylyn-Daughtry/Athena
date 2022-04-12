from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Session
from .serializers import SessionSerializer
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny

# Create your views here.

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_create_session(request):
    if request.method == 'POST':
        serializer = SessionSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)