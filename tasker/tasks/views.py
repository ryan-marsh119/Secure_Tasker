from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TaskSerializer
from .models import Task
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

# task1 = Task(title='task 1', description='code through the sleepyness', completed=False, created_at='2025-03-17')
# task2 = Task(title='task 2', description='go to bed early', completed=False, created_at='2025-03-17')

# class TaskListView(APIView):

    # Original class method written from Milestone 1.
    # def get(self, request):
    #     # Hard coded tasks for milestone 1
    #     # task1 = {'title':'task 1', 'description':'code through the sleepyness', 'completed':False, 'created_at':'2025-03-17'}
    #     # task2 = {'title':'task 2', 'description':'go to bed early', 'completed':False, 'created_at':'2025-03-18'}
        
    #     # Getting objects stored in database. 
    #     tasklist = Task.objects.all()
    #     serializer = TaskSerializer(tasklist, many=True)

    #     return Response(serializer.data)        


    # def TaskList(self, request, *args, **kwargs):
    

    # def TaskDetail
        
# Milestone 3 class method utilizing ListCreateAPIView
class TaskList(ListCreateAPIView):

    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    
class TaskDetail(RetrieveUpdateDestroyAPIView):

    queryset = Task.objects.all()
    serializer_class = TaskSerializer