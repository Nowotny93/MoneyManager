import {useNavigate} from "react-router";
import React, {useEffect, useState} from "react";
import * as Services from "../Services/Services";
import {HiOutlineCurrencyDollar} from "react-icons/hi";
import {BiCategory} from "react-icons/bi";
import {MdEditNote} from "react-icons/md";
import {BsCalendarDate} from "react-icons/bs";
import '../AddExpenseView/AddExpenseView.css';

function AddIncomeView() {

    const history = useNavigate()

    let [incomeCategory, setIncomeCategory] = useState([])

    useEffect(() => {
        Services.getIncomeCategories()
            .then(res => setIncomeCategory(res))
    }, [])

    function onAddIncomeSubmitHandler(e) {
        e.preventDefault()

        const {income, category, note, date_added} = e.target;
        Services.addIncome(income.value, category.value, note.value, date_added.value)
            .then(() => {
                history('/transactions')
        })
    }

    return (
        <div className="main-block">
            <h1>Add New Income</h1>
            <form onSubmit={onAddIncomeSubmitHandler}>


                    <label htmlFor="income" id="icon"><HiOutlineCurrencyDollar /></label>
                    <input type="number" name='income' id='income' placeholder='Amount' />
                    <hr/>

                    <label htmlFor="category" id="icon"><BiCategory/></label>
                    <select  name="category">
                        {incomeCategory.map(x =>
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

export default AddIncomeView