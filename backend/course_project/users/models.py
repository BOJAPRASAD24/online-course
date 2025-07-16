# from django.db import models
# from django.contrib.auth.models import AbstractUser

# class CustomUser(AbstractUser):
#     name = models.CharField(max_length=100)
#     email = models.EmailField(unique=True)
#     mobile = models.CharField(max_length=15)
    
#     # Override fields you don’t need from AbstractUser
#     username = None
#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['name', 'mobile']

#     def __str__(self):
#         return self.email


from django.db import models
from django.contrib.auth.models import AbstractUser

class CustomUser(AbstractUser):
    username = models.CharField(max_length=100)  # Use this instead of name
    email = models.EmailField(unique=True)
    mobile = models.CharField(max_length=15)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'mobile']

    def __str__(self):
        return self.email
