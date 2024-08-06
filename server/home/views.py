from home.models import Student
from django.http import JsonResponse
from django.forms.models import model_to_dict


def all_students(request):
    students = Student.objects.all()
    return JsonResponse(list(students.values()), safe=False)

def student(request, pk):
    student = Student.objects.get(pk=pk)

    return JsonResponse(model_to_dict(student), safe=False)