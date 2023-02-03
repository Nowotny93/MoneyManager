from django.contrib.auth import get_user_model
from django.db import models

UserModel = get_user_model()


class ExpenseInfo(models.Model):

    CATEGORY_CHOICE_RESTAURANTS = 'Restaurants'
    CATEGORY_CHOICE_GIFTS = 'Gifts'
    CATEGORY_CHOICE_FAMILY = 'Family'
    CATEGORY_CHOICE_PHONE_BILL = 'Phone Bill'
    CATEGORY_CHOICE_WATER_BILL = 'Water Bill'
    CATEGORY_CHOICE_ELECTRICITY_BILL = 'Electricity Bill'
    CATEGORY_CHOICE_GAS_BILL = 'Gas Bill'
    CATEGORY_CHOICE_TELEVISION_BILL = 'Television Bill'
    CATEGORY_CHOICE_INTERNET_BILL = 'Internet Bill'
    CATEGORY_CHOICE_TRANSPORT_COSTS = 'Transport costs'
    CATEGORY_CHOICE_CAR_MAINTENANCE = 'Car Maintenance'
    CATEGORY_CHOICE_SHOES = 'Shoes'
    CATEGORY_CHOICE_CLOTHES = 'Clothes'
    CATEGORY_CHOICE_SPORT = 'Sport'
    CATEGORY_CHOICE_PHARMACY = 'Pharmacy'
    CATEGORY_CHOICE_DOCTOR = 'Doctor'
    CATEGORY_CHOICE_EDUCATION = 'Education'
    CATEGORY_CHOICE_BOOKS = 'Books'
    CATEGORY_CHOICE_INVESTMENTS = 'Investments'
    CATEGORY_CHOICE_INSURANCE = 'Insurance'
    CATEGORY_CHOICE_OTHER = 'Other'

    TYPE_CHOICES = (
        (CATEGORY_CHOICE_RESTAURANTS, 'Restaurants'),
        (CATEGORY_CHOICE_GIFTS, 'Gifts'),
        (CATEGORY_CHOICE_FAMILY, 'Family'),
        (CATEGORY_CHOICE_PHONE_BILL, 'Phone Bill'),
        (CATEGORY_CHOICE_WATER_BILL, 'Water Bill'),
        (CATEGORY_CHOICE_ELECTRICITY_BILL, 'Electricity Bill'),
        (CATEGORY_CHOICE_GAS_BILL, 'Gas Bill'),
        (CATEGORY_CHOICE_TELEVISION_BILL, 'Television Bill'),
        (CATEGORY_CHOICE_INTERNET_BILL, 'Internet Bill'),
        (CATEGORY_CHOICE_TRANSPORT_COSTS, 'Transport costs'),
        (CATEGORY_CHOICE_CAR_MAINTENANCE, 'Car Maintenance'),
        (CATEGORY_CHOICE_SHOES, 'Shoes'),
        (CATEGORY_CHOICE_CLOTHES, 'Clothes'),
        (CATEGORY_CHOICE_SPORT, 'Sport'),
        (CATEGORY_CHOICE_PHARMACY, 'Pharmacy'),
        (CATEGORY_CHOICE_DOCTOR, 'Doctor'),
        (CATEGORY_CHOICE_EDUCATION, 'Education'),
        (CATEGORY_CHOICE_BOOKS, 'Books'),
        (CATEGORY_CHOICE_INVESTMENTS, 'Investments'),
        (CATEGORY_CHOICE_INSURANCE, 'Insurance'),
        (CATEGORY_CHOICE_OTHER, 'Other'),
    )

    expense = models.FloatField()

    category = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        null=True,
    )

    note = models.TextField()

    date_added = models.DateField()

    user = models.ForeignKey(
        UserModel,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f"{self.id}. {self.category} {self.expense} lv."


class IncomeInfo(models.Model):

    CATEGORY_CHOICE_SALARY = 'Salary'
    CATEGORY_CHOICE_VOUCHERS = 'Vouchers'
    CATEGORY_CHOICE_BONUSES = 'Bonuses'
    CATEGORY_CHOICE_AWARDS = 'Awards'
    CATEGORY_CHOICE_SELLS = 'Sells'
    CATEGORY_CHOICE_OTHER = 'Other'

    TYPE_CHOICES = (
        (CATEGORY_CHOICE_SALARY, 'Salary'),
        (CATEGORY_CHOICE_VOUCHERS, 'Vouchers'),
        (CATEGORY_CHOICE_BONUSES, 'Bonuses'),
        (CATEGORY_CHOICE_AWARDS, 'Awards'),
        (CATEGORY_CHOICE_SELLS, 'Sells'),
        (CATEGORY_CHOICE_OTHER, 'Other'),
    )

    income = models.FloatField()

    category = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        null=True,
    )

    note = models.TextField()

    date_added = models.DateField()

    user = models.ForeignKey(
        UserModel,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f"{self.id}. {self.category} {self.income} lv."


class BudgetInfo(models.Model):

    CATEGORY_CHOICE_RESTAURANTS = 'Restaurants'
    CATEGORY_CHOICE_GIFTS = 'Gifts'
    CATEGORY_CHOICE_FAMILY = 'Family'
    CATEGORY_CHOICE_PHONE_BILL = 'Phone Bill'
    CATEGORY_CHOICE_WATER_BILL = 'Water Bill'
    CATEGORY_CHOICE_ELECTRICITY_BILL = 'Electricity Bill'
    CATEGORY_CHOICE_GAS_BILL = 'Gas Bill'
    CATEGORY_CHOICE_TELEVISION_BILL = 'Television Bill'
    CATEGORY_CHOICE_INTERNET_BILL = 'Internet Bill'
    CATEGORY_CHOICE_TRANSPORT_COSTS = 'Transport costs'
    CATEGORY_CHOICE_CAR_MAINTENANCE = 'Car Maintenance'
    CATEGORY_CHOICE_SHOES = 'Shoes'
    CATEGORY_CHOICE_CLOTHES = 'Clothes'
    CATEGORY_CHOICE_SPORT = 'Sport'
    CATEGORY_CHOICE_PHARMACY = 'Pharmacy'
    CATEGORY_CHOICE_DOCTOR = 'Doctor'
    CATEGORY_CHOICE_EDUCATION = 'Education'
    CATEGORY_CHOICE_BOOKS = 'Books'
    CATEGORY_CHOICE_INVESTMENTS = 'Investments'
    CATEGORY_CHOICE_INSURANCE = 'Insurance'
    CATEGORY_CHOICE_OTHER = 'Other'

    TYPE_CHOICES = (
        (CATEGORY_CHOICE_RESTAURANTS, 'Restaurants'),
        (CATEGORY_CHOICE_GIFTS, 'Gifts'),
        (CATEGORY_CHOICE_FAMILY, 'Family'),
        (CATEGORY_CHOICE_PHONE_BILL, 'Phone Bill'),
        (CATEGORY_CHOICE_WATER_BILL, 'Water Bill'),
        (CATEGORY_CHOICE_ELECTRICITY_BILL, 'Electricity Bill'),
        (CATEGORY_CHOICE_GAS_BILL, 'Gas Bill'),
        (CATEGORY_CHOICE_TELEVISION_BILL, 'Television Bill'),
        (CATEGORY_CHOICE_INTERNET_BILL, 'Internet Bill'),
        (CATEGORY_CHOICE_TRANSPORT_COSTS, 'Transport costs'),
        (CATEGORY_CHOICE_CAR_MAINTENANCE, 'Car Maintenance'),
        (CATEGORY_CHOICE_SHOES, 'Shoes'),
        (CATEGORY_CHOICE_CLOTHES, 'Clothes'),
        (CATEGORY_CHOICE_SPORT, 'Sport'),
        (CATEGORY_CHOICE_PHARMACY, 'Pharmacy'),
        (CATEGORY_CHOICE_DOCTOR, 'Doctor'),
        (CATEGORY_CHOICE_EDUCATION, 'Education'),
        (CATEGORY_CHOICE_BOOKS, 'Books'),
        (CATEGORY_CHOICE_INVESTMENTS, 'Investments'),
        (CATEGORY_CHOICE_INSURANCE, 'Insurance'),
        (CATEGORY_CHOICE_OTHER, 'Other'),
    )

    budget = models.FloatField()

    category = models.CharField(
        max_length=20,
        choices=TYPE_CHOICES,
        null=True,
    )

    date_added = models.TextField()

    user = models.ForeignKey(
        UserModel,
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f"{self.id}. {self.category} {self.budget} lv."
