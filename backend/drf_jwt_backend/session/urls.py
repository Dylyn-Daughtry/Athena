from django.urls import path
from session import views

urlpatterns = [
    path('', views.get_create_session)
]