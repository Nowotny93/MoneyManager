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

export const addExpense = (expense, category, note, date_added) => {

    let expenseInfo = {
        expense,
        category,
        note,
        date_added,
    }

    return fetch('http://127.0.0.1:8000/manager/expenses/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseInfo),
    })
}

export const addIncome = (income, category, note, date_added) => {

    let incomeInfo = {
        income,
        category,
        note,
        date_added,
    }

    return fetch('http://127.0.0.1:8000/manager/incomes/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(incomeInfo),
    })
}

export const getBudget = () => {
    return fetch ('http://127.0.0.1:8000/manager/getBudget/')
        .then(res => res.json())
        .catch(error => console.log(error))
}