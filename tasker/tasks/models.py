from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    completed = models.BooleanField()
    created_at = models.DateTimeField(auto_now_add=True, null=True)
    # test = models.DateField(auto_created=True)

    def __str__(self):
        return self.title