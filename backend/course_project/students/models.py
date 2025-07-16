from django.db import models

class Student(models.Model):
    name = models.CharField(max_length=100)
    mobile = models.CharField(max_length=15)
    course_name = models.CharField(max_length=100)  
    fees = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.CharField(max_length=50)
    enrollment_date = models.DateField()
