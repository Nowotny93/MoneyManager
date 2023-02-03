
from rest_framework import serializers

from MoneyManager.expenses_api.models import ExpenseInfo, IncomeInfo, BudgetInfo

from django.contrib.auth.models import User



class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExpenseInfo
        fields = '__all__'


class IncomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = IncomeInfo
        fields = '__all__'


class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = BudgetInfo
        fields = '__all__'



# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email')

# Register Serializer
class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'], validated_data['email'], validated_data['password'])

        return user


