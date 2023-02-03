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

    let [user, setUser] = useState([])

    useEffect(() => {
        Services.whoAmI()
            .then(data => setUser(data.username))
    }, [])

    function onAddIncomeSubmitHandler(e) {
        e.preventDefault()

        const {income, category, note, date_added} = e.target;
        Services.addIncome(income.value, category.value, note.value, date_added.value, user)
            .then(() => {
                history('/transactions')
        })
    }

    let workCats = []
    let othCats = []

    for (let i=0; i < incomeCategory.length; i++){
        if (incomeCategory[i].Category === "Salary" || 
            incomeCategory[i].Category === "Vouchers" ||
            incomeCategory[i].Category === "Bonuses"){
                workCats.push(incomeCategory[i].Category)
        }else{
                othCats.push(incomeCategory[i].Category)
        }
    }

    return (
        <div className="main-block">
            <h1>Add New Income</h1>
            <form onSubmit={onAddIncomeSubmitHandler}>


                    <label htmlFor="income" id="icon"><HiOutlineCurrencyDollar /></label>
                    <input type="number" name='income' id='income' placeholder='Amount' />
                    <hr/>

                    <label htmlFor="category" id="icon"><BiCategory/></label>
                    {/* <select  name="category">
                        {incomeCategory.map(x =>
                            <option key={x.Category} value={x.Category}>{x.Category}</option>
                        )}
                    </select> */}
                    <select  name="category">
                        <option value="workCats" disabled>Work</option>
                        {workCats.map(x =>
                            <option key={x} value={x}>{x}</option>
                        )}
                        <option value="othCats" disabled>Other</option>
                        {othCats.map(x =>
                            <option key={x} value={x}>{x}</option>
                        )}
                    </select>
                    <hr/>

                    <label htmlFor="note" id="icon"><MdEditNote /></label>
                    <input type="text" name='note' id='note' placeholder='Note' />

                    <hr/>
                    <label htmlFor="date_added" id="icon"><BsCalendarDate /></label>
                    <input type="date" name="date_added" id="Date Added" />

                <div>
                    <input type='submit' value='Add' style={{width: "100%"}} className="submitAddBtn" />
                </div>

            </form>
        </div>
    )
}

export default AddIncomeView