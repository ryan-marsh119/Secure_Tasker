from django.urls import path
from . import views

urlpatterns = [
    path('api/tasks/', views.TaskList.as_view()),
    path('api/tasks/<int:pk>/', views.TaskDetail.as_view(), name='pk'),
]