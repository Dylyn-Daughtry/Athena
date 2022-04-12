from urllib import response
from .models import Student
from .serializers import StudentSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes

# Create your views here.


@api_view(['GET'])
@permission_classes([AllowAny])
def get_all_students(request):
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_student(request, pk):
    student = Student.objects.filter(pk=pk)
    serializer = StudentSerializer(student, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def user_student(request):
    print(
        'User ', f"{request.user.id} {request.user.email} {request.user.username}")
    if request.method == 'POST':
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    elif request.method == 'GET':
        student = Student.objects.filter(user_id=request.user.id)
        serializer = StudentSerializer(student, many=True)
        return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_student_by_uid(request, id):
    student = Student.objects.filter(user_id=id)
    serializer = StudentSerializer(student, many=True)
    return Response(serializer.data)