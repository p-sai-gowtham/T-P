from . import views
from django.urls import path,include
from django.conf import settings
from django.conf.urls.static import static

app_name= 'app'

urlpatterns = [
    path('',views.home),
    path("dashboard", views.dashboard),
    path("adminview", views.Admin, name="admin" ),
    path("student", views.all_students,name="student"),
    path("student/<str:pk>", views.student),
]