import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import * as Services from '../Services/Services'
import './AddExpenseView.css'
import { HiOutlineCurrencyDollar } from 'react-icons/hi';
import { BiCategory } from 'react-icons/bi'
import { MdEditNote } from 'react-icons/md'
import { BsCalendarDate } from 'react-icons/bs'

function AddExpenseView() {

    const history = useNavigate()

    let [expenseCategory, setExpenseCategory] = useState([])

    useEffect(() => {
        Services.getExpenseCategories()
            .then(res => setExpenseCategory(res))
    }, [])

    function onAddExpenseSubmitHandler(e) {
        e.preventDefault()

        const {expense, category, note, date_added} = e.target;
        Services.addExpense(expense.value, category.value, note.value, date_added.value)
            .then(() => {
                history('/transactions')
            })
    }

    return (
        <div className="main-block">
            <h1>Add New Expense</h1>
            <form onSubmit={onAddExpenseSubmitHandler}>


                    <label htmlFor="expense" id="icon"><HiOutlineCurrencyDollar /></label>
                    <input type="number" name='expense' id='expense' placeholder='Amount' />
                    <hr/>

                    <label htmlFor="category" id="icon"><BiCategory/></label>
                    <select  name="category">
                        {expenseCategory.map(x =>
                            <option key={x.Category} value={x.Category}>{x.Category}</option>
                        )}
                    </select>
                    <hr/>

                    <label htmlFor="note" id="icon"><MdEditNote /></label>
                    <input type="text" name='note' id='note' placeholder='Note' />

                    <hr/>
                    <label htmlFor="date_added" id="icon"><BsCalendarDate /></label>
                    <input type="date" name="date_added" id="Date Added" />

                <div>
                    <input type='submit' value='Add' />
                </div>

            </form>
        </div>
    )
}

export default AddExpenseView