from django.urls import path
from . import views

# Should I change the path to be: 
#     path('', views.TaskList.as_view()),
#     path('<int:id>/', views.TaskDetail.as_view(), name='id')?

urlpatterns = [
    path('api/tasks/', views.TaskList.as_view()),
    path('api/tasks/<int:pk>/', views.TaskDetail.as_view(), name='pk')
]