export const whoAmI = () => {
    return fetch("http://localhost:8000/manager/whoami/", {
        headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        })
        .then((res) => res.json())
        .catch(error => console.log(error))
}

export const getSession = () => {
    return fetch("http://localhost:8000/manager/session/", {
            credentials: "include",
        })
        .then((res) => res.json())
        .catch(error => console.log(error))
}

export const getOneExpense = (expenseId) => {
    return fetch ('http://127.0.0.1:8000/manager/expenses/' + expenseId)
        .then(res => res.json())
        .catch(error => console.log(error))
}

export const getOneIncome = (incomeId) => {
    return fetch ('http://127.0.0.1:8000/manager/incomes/' + incomeId)
        .then(res => res.json())
        .catch(error => console.log(error))
}

export const getOneBudget = (budgetId) => {
    return fetch ('http://127.0.0.1:8000/manager/budgets/' + budgetId)
        .then(res => res.json())
        .catch(error => console.log(error))
}

export const getAllExpenses = () => {
    return fetch ('http://127.0.0.1:8000/manager/expenses/')
        .then(res => res.json())
        .catch(error => console.log(error))
}

export const getAllIncomes = () => {
    return fetch ('http://127.0.0.1:8000/manager/incomes/')
        .then(res => res.json())
        .catch(error => console.log(error))
}

export const getAllBudgets = () => {
    return fetch ('http://127.0.0.1:8000/manager/budgets/')
        .then(res => res.json())
        .catch(error => console.log(error))
}

export const getExpenseCategories = () => {
    return fetch ('http://127.0.0.1:8000/manager/expenseCategories/')
        .then(res => res.json())
        .catch(error => console.log(error))
}

export const getIncomeCategories = () => {
    return fetch ('http://127.0.0.1:8000/manager/incomeCategories/')
        .then(res => res.json())
        .catch(error => console.log(error))
}

// export const getMonthlyTransactions = () => {
//     return fetch ('http://127.0.0.1:8000/manager/monthlyTransactions/')
//         .then(res => res.json())
//         .catch(error => console.log(error))
// }

export const addExpense = (expense, category, note, date_added, user) => {

    let expenseInfo = {
        expense,
        category,
        note,
        date_added,
        user
    }

    return fetch('http://127.0.0.1:8000/manager/expenses/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseInfo),
    })
}

export const addIncome = (income, category, note, date_added, user) => {

    let incomeInfo = {
        income,
        category,
        note,
        date_added,
        user,
    }

    return fetch('http://127.0.0.1:8000/manager/incomes/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(incomeInfo),
    })
}

export const updateExpense = (expenseId, expense) => {
    return fetch('http://127.0.0.1:8000/manager/expenses/' + expenseId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(expense)
    })
}

export const updateIncome = (incomeId, income) => {
    return fetch('http://127.0.0.1:8000/manager/incomes/' + incomeId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(income)
    })
}

export const deleteExpense = (expenseId) => {
        return fetch ('http://127.0.0.1:8000/manager/expenses/' + expenseId,{
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const deleteIncome = (incomeId) => {
        return fetch ('http://127.0.0.1:8000/manager/incomes/' + incomeId,{
            method: 'DELETE',
            headers: {
            'Content-Type': 'application/json',
        },
    })
}

export const addBudget = (budget, category, date_added, user) => {

    let budgetInfo = {
        budget,
        category,
        date_added,
        user,
    }

    return fetch('http://127.0.0.1:8000/manager/budgets/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(budgetInfo),
    })
}

export const updateBudget = (budgetId, budget) => {
    return fetch('http://127.0.0.1:8000/manager/budgets/' + budgetId, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(budget)
    })
}

export const deleteBudget = (budgetId) => {
    return fetch ('http://127.0.0.1:8000/manager/budgets/' + budgetId,{
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
    },
})
}

export const getBudget = () => {
    return fetch ('http://127.0.0.1:8000/manager/getBudget/')
        .then(res => res.json())
        .catch(error => console.log(error))
}