from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from user.models import User
from home.models import Student
from django.http import JsonResponse
from django.core.serializers import serialize
from django.shortcuts import get_object_or_404

def home(request):
    return render(request, "home/index.html")

@login_required
def dashboard(request):
    return render(request, "home/dashboard.html")

@login_required
def Admin(request):
    if request.GET.get('page') == 'edit':
        user_id = request.GET.get('id')
        user = User.objects.get(pk=user_id)
        return render(request, 'home/admin.html', {'user': user})
    users = User.objects.filter(is_superuser=False).values()
    return render(request, "home/admin.html", {"users":users})

def all_students(request):
    students = Student.objects.all()
    return JsonResponse(list(students.values()), safe=False)

def student(request, pk):
    student = get_object_or_404(Student, pk=pk)
    student_json = serialize('json', [student])
    return JsonResponse(student_json, safe=False)


    