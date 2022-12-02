from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from rest_framework.response import Response


from MoneyManager.expenses_api.models import ExpenseInfo, IncomeInfo
from MoneyManager.expenses_api.serializers import ExpenseSerializer, IncomeSerializer


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