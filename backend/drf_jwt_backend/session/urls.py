from django.urls import path
from session import views

urlpatterns = [
    path('', views.get_create_session),
    path('tutor/<int:id>', views.get_tutor_session_by_uid),
    path('student/<int:id>', views.get_student_session_by_uid),
    path('<int:id>', views.update_session_status)
]