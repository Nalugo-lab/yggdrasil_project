from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    name = models.CharField(max_length=255)
    username = models.CharField(max_length=24, unique=True)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)
