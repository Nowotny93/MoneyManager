
from django.urls import path
from . import views
from .views import RegisterAPI
from knox import views as knox_views


urlpatterns = [
    path('expenses/', views.ListExpensesView.as_view()),
    path('incomes/', views.ListIncomesView.as_view()),
    path('getBudget/', views.get_budget),
    path('expenseCategories/', views.get_expense_categories),
    path('incomeCategories/', views.get_income_categories),
    path('expenses/<int:expense_id>', views.ExpenseGetUpdateDelete.as_view()),
    path('incomes/<int:income_id>', views.IncomeGetUpdateDelete.as_view()),
    path('monthlyTransactions', views.get_monthly_transactions),
    path('budgets/', views.ListBudgetsView.as_view()),
    path('budgets/<int:budget_id>', views.BudgetGetUpdateDelete.as_view()),

    path('csrf/', views.get_csrf, name='api-csrf'),
    path('login/', views.login_view, name='api-login'),
    path('logout/', views.logout_view, name='api-logout'),
    path('session/', views.session_view, name='api-session'),
    path('whoami/', views.whoami_view, name='api-whoami'),


    path('register/', RegisterAPI.as_view(), name='register'),
    # path('login/', LoginAPI.as_view(), name='login'),
    # path('logout/', knox_views.LogoutView.as_view(), name='logout'),
    # path('logoutall/', knox_views.LogoutAllView.as_view(), name='logoutall'),
]