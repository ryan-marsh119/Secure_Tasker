# from rest_framework.views import APIView
# from rest_framework.response import Response
from .serializers import TaskSerializer
from .models import Task
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
        
# Milestone 3 class method utilizing ListCreateAPIView
class TaskList(ListCreateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    # Milestone 4 add authentication
    permission_classes = [IsAuthenticated]
    
class TaskDetail(RetrieveUpdateDestroyAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]      