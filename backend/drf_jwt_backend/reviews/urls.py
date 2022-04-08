from django.urls import path
from reviews.views import get_all_reviews
from reviews import views

urlpatterns = [
    path('', views.get_create_review),
    path('all', views.get_all_reviews),
    path('<int:pk>', views.get_review),
    path('tutor', views.get_review_filtered)
]