from django.db import models

# Create your models here.

class Student(models.Model):
    reg_no = models.TextField(max_length=10,primary_key=True)
    name = models.TextField(max_length=60, blank=True, null=True)
    email = models.EmailField(max_length=255, blank=True, null=True)
    batch_year = models.CharField(max_length=4,blank=True, null=True)
    batch = models.TextField(max_length=6, blank=True, null=True)
    category_name = models.TextField(max_length=100, blank=True, null=True)
    attempted = models.IntegerField(blank=True,null=True)
    tests = models.JSONField(blank=True,null=True)