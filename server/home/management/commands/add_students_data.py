from django.core.management.base import BaseCommand
from home.models import Student
import os
import pandas as pd

class Command(BaseCommand):
    help = "Create students only once"

    def handle(self, *args, **options):
        file = os.path.join(os.path.dirname(__file__), "students.xlsx")
        
        if not os.path.exists(file):
            self.stdout.write(self.style.ERROR('The file students.xlsx does not exist'))
            return

        data = pd.read_excel(file)

        if data.empty:
            self.stdout.write(self.style.ERROR('The file students.xlsx is empty'))
            return

        name = data['Name']
        email = data['Email']
        id_no = data['ID No.']
        batch_year = data['Batch Year']
        batch = data['Batch']
        category = data['Category Name']
        attempted = data['Attempted']
        mock_test_status = data['Mock Test-02_Status']
        mock_test_marks = data['Mock Test-02_Marks']
        mock_test_max_marks = data['Mock Test-02_Max_Marks']
        mock_test_percentage = data['Mock Test-02_Percentage']
        mock_test_qualified = data['Mock Test-02_Qualified']

        students_created = 0

        for i in range(len(name)):
            if Student.objects.filter(reg_no=id_no[i]).exists():
                self.stdout.write(self.style.WARNING(f"Student with ID {id_no[i]} already exists"))
            else:
                student = Student.objects.create(
                    name=name[i],
                    email=email[i],
                    reg_no=id_no[i],
                    batch_year=batch_year[i],
                    batch=batch[i],
                    category_name=category[i],
                    attempted=attempted[i],
                    tests=[{
                        "Mock Test-02": {
                            "status": mock_test_status[i],
                            "marks": mock_test_marks[i],
                            "max_marks": mock_test_max_marks[i],
                            "percentage": mock_test_percentage[i],
                            "qualified": mock_test_qualified[i]
                        }
                    }]
                )
                students_created += 1

        if students_created > 0:
            self.stdout.write(self.style.SUCCESS(f"{students_created} students added successfully"))
        else:
            self.stdout.write(self.style.WARNING("No new students were added"))
