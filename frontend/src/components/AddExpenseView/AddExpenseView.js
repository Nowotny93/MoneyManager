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

    let [user, setUser] = useState([])

    useEffect(() => {
        Services.whoAmI()
            .then(data => setUser(data.username))
    }, [])

    let homeBillsCats = []
    let clothingCats = []
    let othCats = []
    let healthCats = []
    let financialCats = []
    
    for (let i=0; i < expenseCategory.length; i++){
        if (expenseCategory[i].Category === "Phone Bill" || 
            expenseCategory[i].Category === "Water Bill" ||
            expenseCategory[i].Category === "Internet Bill" ||
            expenseCategory[i].Category === "Electricity Bill" ||
            expenseCategory[i].Category === "Gas Bill" ||
            expenseCategory[i].Category === "Television Bill"){
            homeBillsCats.push(expenseCategory[i].Category)
        }else if (expenseCategory[i].Category === "Clothes" ||
                  expenseCategory[i].Category === "Shoes"){
                    clothingCats.push(expenseCategory[i].Category)
        }else if (expenseCategory[i].Category === "Pharmacy" ||
                  expenseCategory[i].Category === "Doctor"){
                    healthCats.push(expenseCategory[i].Category)
        }else if (expenseCategory[i].Category === "Investments" ||
                  expenseCategory[i].Category === "Insurance"){
                  financialCats.push(expenseCategory[i].Category)
        }else{
                  othCats.push(expenseCategory[i].Category)
        }
    }


    function onAddExpenseSubmitHandler(e) {
        e.preventDefault()

        const {expense, category, note, date_added} = e.target;
        Services.addExpense(expense.value, category.value, note.value, date_added.value, user)
            .then(() => {
                history('/transactions')
            })
    }

    
    return (
        <div className="main-block">
            <h1>Add New Expense</h1>
            <div>

                {/* <button className="btn btn-primary mr-2" onClick={whoami}>WhoAmI</button> */}
                {/* <button className="btn btn-danger" onClick={this.logout}>Log out</button> */}
            </div>
            <form onSubmit={onAddExpenseSubmitHandler}>
                    <label htmlFor="expense" id="icon"><HiOutlineCurrencyDollar /></label>
                    <input type="number" name='expense' id='expense' placeholder='Amount' />
                    <hr/>

                    <label htmlFor="category" id="icon"><BiCategory/></label>
                    {/* <select  name="category">
                        {expenseCategory.map(x =>
                            <option key={x.Category} value={x.Category}>{x.Category}</option>
                        )}
                    </select> */}
                    <select  name="category">
                        <option value="homeBills" disabled>Home Bills</option>
                        {homeBillsCats.map(x =>
                            <option key={x} value={x}>{x}</option>
                        )}
                        <option value="clothingCats" disabled>Clothing</option>
                        {clothingCats.map(x =>
                            <option key={x} value={x}>{x}</option>
                        )}
                        <option value="healthCats" disabled>Health</option>
                        {healthCats.map(x =>
                            <option key={x} value={x}>{x}</option>
                        )}
                        <option value="financialCats" disabled>Financial</option>
                        {financialCats.map(x =>
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
                    <input type='submit' value='Add' style={{width: "100%"}} className="submitAddBtn"/>
                </div>

            </form>
        </div>
    )
}

export default AddExpenseView