from django.db import models
from encrypted_model_fields.fields import EncryptedTextField

class Task(models.Model):
    title = models.CharField(blank=True, max_length=200)
    description = EncryptedTextField(blank=True)
    completed = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title