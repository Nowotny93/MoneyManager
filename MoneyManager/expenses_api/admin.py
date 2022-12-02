from django.contrib import admin

from MoneyManager.expenses_api.models import ExpenseInfo, IncomeInfo

admin.site.register([ExpenseInfo, IncomeInfo])