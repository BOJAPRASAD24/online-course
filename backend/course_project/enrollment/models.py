from django.db import models

class Enrollment(models.Model):
    name = models.CharField(max_length=100)
    course_name = models.CharField(max_length=100)  
    enrollment_date = models.DateField()


