from rest_framework import serializers

from MoneyManager.expenses_api.models import ExpenseInfo, IncomeInfo


class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseInfo
        fields = '__all__'


class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncomeInfo
        fields = '__all__'