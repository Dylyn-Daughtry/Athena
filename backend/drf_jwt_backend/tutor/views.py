from .models import Tutor
from .serializers import TutorSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes

# Create your views here.


@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_tutors(request):
    tutors = Tutor.objects.all()
    serializer = TutorSerializer(tutors, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_tutor(request, pk):
    tutor = Tutor.objects.filter(pk=pk)
    serializer = TutorSerializer(tutor, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_tutor(request):
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST':
        serializer = TutorSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        tutor = Tutor.objects.filter(user_id=request.user.id)
        serializer = TutorSerializer(tutor, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_tutor_by_uid(request, id):
    tutor = Tutor.objects.filter(user_id=id)
    serializer = TutorSerializer(tutor, many=True)
    return Response(serializer.data)