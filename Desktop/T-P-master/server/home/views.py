from user.models import User
from django.http import JsonResponse
from django.forms.models import model_to_dict
import json
from django.views.decorators.csrf import csrf_exempt


def all_students(request):
    
    students = User.objects.all()
    return JsonResponse(list(students.values()), safe=False)

def student(request, pk):
    student = User.objects.get(reg_no=pk)

    return JsonResponse(model_to_dict(student), safe=False)


@csrf_exempt
def add_drive_data(request):
    if request.method == "POST":
        try:
            body = json.loads(request.body)
            for i in body['results']:
                student = User.objects.get(reg_no=i['reg_no'])
                if student.drives is None:
                    student.drives = {}
                company_name = i.get('companyName')
                if company_name:
                    student.drives[company_name] = {'checkedDrives':i['checkedDrives'], 'noOfDrives':i['noOfDrives'], 'selected':i['selected']}
                else:
                    print("Company name is missing")
                student.save()

            return JsonResponse({'status': 'success'}, status=200)
        
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)
        
        except Exception as e:
            print(f"Error: {e}")
            return JsonResponse({'error': 'Internal server error'}, status=500)
    
    return JsonResponse({'error': 'Invalid request method'}, status=405)