from django.core.management.base import BaseCommand
from home.models import Student
import os
import pandas as pd

class Command(BaseCommand):
    help = "Create or update students with mock test data from multiple files"

    def add_arguments(self, parser):
        parser.add_argument('directory', type=str, help="Directory containing mock test XLSX files")

    def handle(self, *args, **options):
        directory = options['directory']

        if not os.path.exists(directory):
            self.stdout.write(self.style.ERROR(f'The directory {directory} does not exist'))
            return

        students_created = 0
        students_updated = 0

        for filename in os.listdir(directory):
            if filename.endswith('.xlsx'):
                file_path = os.path.join(directory, filename)
                self.stdout.write(self.style.NOTICE(f'Processing file: {file_path}'))

                try:
                    data = pd.read_excel(file_path)
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f'Error reading file {filename}: {e}'))
                    continue

                if data.empty:
                    self.stdout.write(self.style.WARNING(f'The file {filename} is empty'))
                    continue

                required_columns = ['Name', 'Email', 'ID No.', 'Batch Year', 'Batch', 'Category Name', 'Attempted']
                missing_columns = [col for col in required_columns if col not in data.columns]

                if missing_columns:
                    self.stdout.write(self.style.ERROR(f'Missing required columns in file {filename}: {", ".join(missing_columns)}'))
                    continue

                for index, row in data.iterrows():
                    student, created = Student.objects.get_or_create(
                        reg_no=row['ID No.'],
                        defaults={
                            'name': row['Name'],
                            'email': row['Email'],
                            'batch_year': row['Batch Year'],
                            'batch': row['Batch'],
                            'category_name': row['Category Name'],
                            'attempted': row['Attempted'],
                            'tests': {}
                        }
                    )

                    if created:
                        students_created += 1
                        self.stdout.write(self.style.SUCCESS(f"Student with ID {row['ID No.']} created"))
                    else:
                        students_updated += 1
                        self.stdout.write(self.style.WARNING(f"Student with ID {row['ID No.']} updated"))

                    for col in data.columns:
                        if col.startswith('Mock Test-'):
                            parts = col.split('_')
                            if len(parts) > 1:
                                test_name = parts[0]
                                attribute = parts[1]

                                if test_name not in student.tests:
                                    student.tests[test_name] = {}

                                student.tests[test_name][attribute.lower()] = row[col]

                    student.save()

        if students_created > 0:
            self.stdout.write(self.style.SUCCESS(f"{students_created} students added successfully"))

        if students_updated > 0:
            self.stdout.write(self.style.SUCCESS(f"{students_updated} students updated successfully"))

        if students_created == 0 and students_updated == 0:
            self.stdout.write(self.style.WARNING("No students were added or updated"))
