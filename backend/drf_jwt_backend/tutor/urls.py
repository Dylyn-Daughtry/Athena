from django.urls import path
from tutor import views

urlpatterns = [
    path('', views.user_tutor),
    path('<int:pk>', views.get_tutor),
    path('all', views.get_all_tutors)
]