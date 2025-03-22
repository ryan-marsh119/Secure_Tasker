from rest_framework import serializers
from .models import Task

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        # Task.object.all()?????????
        fields = ['title', 'description', 'completed', 'created_at']