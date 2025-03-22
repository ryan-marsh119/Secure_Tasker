from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import TaskSerializer
# from .models import Task


# task1 = Task(title='task 1', description='code through the sleepyness', completed=False, created_at='2025-03-17')
# task2 = Task(title='task 2', description='go to bed early', completed=False, created_at='2025-03-17')

class TaskListView(APIView):

    def get(self, request):
        # Hard coded tasks for milestone 1
        task1 = {'title':'task 1', 'description':'code through the sleepyness', 'completed':False, 'created_at':'2025-03-17'}
        task2 = {'title':'task 2', 'description':'go to bed early', 'completed':False, 'created_at':'2025-03-18'}
        
        tasklist = [task1, task2]
        serializer = TaskSerializer(tasklist, many=True)

        return Response(serializer.data)        