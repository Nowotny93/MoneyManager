from django.http import HttpResponse
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response

from django.core import serializers

from MoneyManager.expenses_api.models import ExpenseInfo, IncomeInfo, BudgetInfo
from MoneyManager.expenses_api.serializers import ExpenseSerializer, IncomeSerializer, BudgetSerializer

import json

from django.contrib.auth import authenticate, login, logout
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.views.decorators.csrf import ensure_csrf_cookie
from django.views.decorators.http import require_POST

from django.contrib.auth import authenticate
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.status import (
    HTTP_400_BAD_REQUEST,
    HTTP_404_NOT_FOUND,
    HTTP_200_OK
)

from rest_framework import generics, permissions
from rest_framework.response import Response
from knox.views import AuthToken
from .serializers import UserSerializer, RegisterSerializer
from django.contrib.auth import login
from rest_framework import permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from knox.views import LoginView as KnoxLoginView


class ListExpensesView(APIView):

    def get(self, req):
        expenses = ExpenseInfo.objects.all()
        serializer = ExpenseSerializer(expenses, many=True)
        return Response(serializer.data)

    def post(self, req):
        serializer = ExpenseSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListIncomesView(APIView):

    def get(self, req):
        incomes = IncomeInfo.objects.all()
        serializer = IncomeSerializer(incomes, many=True)
        return Response(serializer.data)

    def post(self, req):
        serializer = IncomeSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListBudgetsView(APIView):

    def get(self, req):
        budgets = BudgetInfo.objects.all()
        serializer = BudgetSerializer(budgets, many=True)
        return Response(serializer.data)

    def post(self, req):
        serializer = BudgetSerializer(data=req.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ExpenseGetUpdateDelete(APIView):

    def put(self, request, expense_id):
        try:
            expense = ExpenseInfo.objects.get(id=expense_id)
            serializer = ExpenseSerializer(expense, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as ex:
            return Response({"message" : "NOT FOUND"}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, expense_id):
        try:
            expense = ExpenseInfo.objects.get(id=expense_id)
            serializer = ExpenseSerializer(expense)
            return Response(serializer.data)
        except:
            return Response({"message": "NOT FOUND"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, expense_id):
        try:
            expense = ExpenseInfo.objects.get(id=expense_id)
            expense.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as ex:
            return Response({"message": "NOT FOUND"}, status=status.HTTP_404_NOT_FOUND)


class IncomeGetUpdateDelete(APIView):

    def put(self, request, income_id):
        try:
            income = IncomeInfo.objects.get(id=income_id)
            serializer = IncomeSerializer(income, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as ex:
            return Response({"message" : "NOT FOUND"}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, income_id):
        try:
            income = IncomeInfo.objects.get(id=income_id)
            serializer = IncomeSerializer(income)
            return Response(serializer.data)
        except:
            return Response({"message": "NOT FOUND"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, income_id):
        try:
            income = IncomeInfo.objects.get(id=income_id)
            income.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as ex:
            return Response({"message": "NOT FOUND"}, status=status.HTTP_404_NOT_FOUND)


class BudgetGetUpdateDelete(APIView):

    def put(self, request, budget_id):
        try:
            budget = BudgetInfo.objects.get(id=budget_id)
            serializer = BudgetSerializer(budget, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors)
        except Exception as ex:
            return Response({"message" : "NOT FOUND"}, status=status.HTTP_404_NOT_FOUND)

    def get(self, request, budget_id):
        try:
            budget = BudgetInfo.objects.get(id=budget_id)
            serializer = BudgetSerializer(budget)
            return Response(serializer.data)
        except:
            return Response({"message": "NOT FOUND"}, status=status.HTTP_404_NOT_FOUND)

    def delete(self, request, budget_id):
        try:
            budget = BudgetInfo.objects.get(id=budget_id)
            budget.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as ex:
            return Response({"message": "NOT FOUND"}, status=status.HTTP_404_NOT_FOUND)


@api_view(['GET'])
def get_budget(request):
    expenses = ExpenseInfo.objects.all()
    incomes = IncomeInfo.objects.all()
    total_incomes = 0
    total_expenses = 0

    for i in incomes:
        total_incomes += i.income

    for e in expenses:
        total_expenses += e.expense

    return Response({"Budget": f"{total_incomes - total_expenses}"})


# class getMonthlyTransactions(APIView):

#     def get(self, req):
#         expenses = ExpenseInfo.objects.all()
#         incomes = IncomeInfo.objects.all()
#         expenses_serializer = ExpenseSerializer(expenses, many=True)
#         incomes_serializer = IncomeSerializer(incomes, many=True)
#         all_transactions = expenses_serializer.data + incomes_serializer.data
#         return Response(all_transactions)


@api_view(['GET'])
def get_monthly_transactions(request):
    monthsList = [
        {"Janurary": []},
        {"February": []},
        {"March": []},
        {"April": []},
        {"May": []},
        {"June": []},
        {"July": []},
        {"August": []},
        {"September": []},
        {"October": []},
        {"November": []},
        {"December": []},
    ]

    expenses = ExpenseInfo.objects.all()
    incomes = IncomeInfo.objects.all()
    expenses_serializer = ExpenseSerializer(expenses, many=True)
    incomes_serializer = IncomeSerializer(incomes, many=True)
    all_transactions = expenses_serializer.data + incomes_serializer.data


    for t in all_transactions:
        date_added = t['date_added']
        # date_value = date_added.strftime('%m')
        date_value = date_added.split('-')[1]

        if date_value == '01':
            monthsList['January'].append(t)
        elif date_value == '02':
            monthsList['February'].append(t)
        elif date_value == '03':
            monthsList['March'].append(t)
        elif date_value == '04':
            monthsList['April'].append(t)
        elif date_value == '05':
            monthsList['May'].append(t)
        elif date_value == '06':
            monthsList['June'].append(t)
        elif date_value == '07':
            monthsList['July'].append(t)
        elif date_value == '08':
            monthsList['August'].append(t)
        elif date_value == '09':
            monthsList['September'].append(t)
        elif date_value == '10':
            monthsList['October'].append(t)
        elif date_value == '11':
            monthsList[10]['November'].append(t)
        elif date_value == '12':
            monthsList[11]['December'].append(t)

    return Response(monthsList)


@api_view(['GET'])
def get_expense_categories(request):
    expenses_model = ExpenseInfo
    expenses_categories = []

    for c in expenses_model.category.field.choices:
        expenses_categories.append({"Category": f"{c[0]}"})

    return Response(expenses_categories)


@api_view(['GET'])
def get_income_categories(request):
    incomes_model = IncomeInfo
    incomes_categories = []

    for c in incomes_model.category.field.choices:
        incomes_categories.append({"Category": f"{c[0]}"})

    return Response(incomes_categories)





def get_csrf(request):
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response


@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({'detail': 'Please provide username and password.'}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    login(request, user)
    return JsonResponse({'detail': 'Successfully logged in.'})


def logout_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)

    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})


@ensure_csrf_cookie
def session_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'isAuthenticated': True})


def whoami_view(request):
    if not request.user.is_authenticated:
        return JsonResponse({'isAuthenticated': False})

    return JsonResponse({'username': request.user.id})


# @csrf_exempt
# @api_view(["POST"])
# @permission_classes((AllowAny,))
# def login(request):
#     username = request.data.get("username")
#     password = request.data.get("password")
#     if username is None or password is None:
#         return Response({'error': 'Please provide both username and password'},
#                         status=HTTP_400_BAD_REQUEST)
#     user = authenticate(username=username, password=password)
#     if not user:
#         return Response({'error': 'Invalid Credentials'},
#                         status=HTTP_404_NOT_FOUND)
#     token, _ = Token.objects.get_or_create(user=user)
#     return Response({'token': token.key},
#                     status=HTTP_200_OK)


# Register API
class RegisterAPI(generics.GenericAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
        "user": UserSerializer(user, context=self.get_serializer_context()).data,
        "token": AuthToken.objects.create(user)[1]
        })


# class LoginAPI(KnoxLoginView):
#     permission_classes = (permissions.AllowAny,)

#     def post (self, request, format=None):
#         serializer = AuthTokenSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         user = serializer.validated_data['user']
#         login(request, user)
#         return super(LoginAPI, self).post(request, format = None)



