from django.db import models

class Course(models.Model):
    course_name = models.CharField(max_length=100)
    course_fees = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.CharField(max_length=50)