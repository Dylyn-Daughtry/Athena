from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from .models import Reviews
from .serializers import ReviewSerializer
from rest_framework import status
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_all_reviews(request):
    reviews = Reviews.objects.all()
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_review(request, pk):
    review = Reviews.objects.filter(pk=pk)
    serializer = ReviewSerializer(review, many=True)
    return Response(serializer.data)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_review_filtered(request):
    review_sort = request.query_params.get('tutor')
    review = Reviews.objects.all()

    if review_sort:
        review = review.filter(tutor=review_sort)

    serializer = ReviewSerializer(review, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_create_review(request):
    if request.method == 'POST':
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)