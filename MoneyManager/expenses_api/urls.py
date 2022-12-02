from django.urls import path
from . import views

urlpatterns = [
    path('expenses/', views.ListExpensesView.as_view()),
    path('incomes/', views.ListIncomesView.as_view()),
    path('getBudget/', views.get_budget),
    path('expenseCategories/', views.get_expense_categories),
    path('incomeCategories/', views.get_income_categories),
]