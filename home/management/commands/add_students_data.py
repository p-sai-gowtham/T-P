from django.core.management.base import BaseCommand
from home.models import Student
# from datetime import datetime
# from user.models import User
import os
import pandas as pd
import numpy as np

class Command(BaseCommand):
    help = "Create students only once"

    def handle(self, *args, **options):
        csv_filename = os.path.join(os.path.dirname(__file__), "students.xlsx")
        print(csv_filename)

        data = pd.read_csv(csv_filename, encoding="windows_1258")
        students = data.iloc[:, :].values
        # if Student.objects.exists():
        #     self.stdout.write(
        #         self.style.SUCCESS("Objects already exist. No action taken.")
        #     )
        # else:
        #     for city in cities:
        #         if not Student.objects.filter(name=city).exists():
        #             Student.objects.create(
        #                 name=city,
        #                 created_at=datetime.now(pytz.timezone("Europe/London")),
        #                 agent=User.objects.get(email="admin@gmail.com"),
        #             )
        #     self.stdout.write(self.style.SUCCESS("Objects created successfully."))
