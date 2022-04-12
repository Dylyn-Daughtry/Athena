from django.urls import path
from student import views

urlpatterns = [
    path('', views.user_student),
    path('<int:pk>', views.get_student),
    path('all', views.get_all_students),
    path('user/<int:id>', views.get_student_by_uid)

]