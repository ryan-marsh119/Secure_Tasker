from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    completed = models.BooleanField()
    created_at = models.DateTimeField()