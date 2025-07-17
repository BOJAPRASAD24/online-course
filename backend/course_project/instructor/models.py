from django.db import models

class Instructor(models.Model):
    user_name = models.CharField(max_length=100)
    bio = models.TextField()


