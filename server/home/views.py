from user.models import User
from django.http import JsonResponse
from django.forms.models import model_to_dict


def all_students(request):
    
    students = User.objects.all()
    return JsonResponse(list(students.values()), safe=False)

def student(request, pk):
    student = User.objects.get(reg_no=pk)

    return JsonResponse(model_to_dict(student), safe=False)