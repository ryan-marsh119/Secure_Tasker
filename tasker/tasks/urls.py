from django.urls import path
from . import views

urlpatterns = [
    path("api/tasks/", views.TaskListView.as_view()),
]