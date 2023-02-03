import '../AddExpenseView/AddExpenseView.css';
import {HiOutlineCurrencyDollar} from "react-icons/hi";
import {BiCategory} from "react-icons/bi";
import {MdEditNote} from "react-icons/md";
import {BsCalendarDate} from "react-icons/bs";
import React, {useEffect, useState} from "react";
import * as Services from "../Services/Services";
import {useNavigate, useParams} from "react-router";
import {RiDeleteBin5Line} from "react-icons/ri";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function EditExpenseView() {

    const params = useParams()
    const history = useNavigate()

    let [expense, setExpense] = useState({})

    useEffect(() => {
        Services.getOneExpense(params.id)
            .then(res => setExpense(res))
    }, [])

    let [expenseCategory, setExpenseCategory] = useState([])

    useEffect(() => {
        Services.getExpenseCategories()
            .then(res => setExpenseCategory(res))
    }, [])

    const handleChange = (e) => {
        setExpense({...expense, [e.target.name]: e.target.value})
    }

    function onExpenseEditSubmit(e) {
        e.preventDefault()

        let updatedExpense = {...expense, [e.target.name]: e.target.value}

        Services.updateExpense(params.id, updatedExpense)
            .then(() => {
                history('/transactions');
                return;
        })
    }

    const handleDelete = (id) => {
        Services.deleteExpense(id)
        .then(() => {
                history('/transactions');
                return;
        })
    }



    const submitDelete = (id) => {


    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this expense?',
      buttons: [
        {
          label: 'Yes',
          onClick: () => handleDelete(id)
        },
        {
          label: 'No',
          //onClick: () => alert('Click No')
        }
      ]
    });
  }

    return (
        <div className="main-block">
            <h1>Edit Expense</h1>
            <form onSubmit={onExpenseEditSubmit}>
                    <label htmlFor="expense" id="icon"><HiOutlineCurrencyDollar /></label>
                    <input type="number" name='expense' id='expense' value={expense.expense || ''} onChange={handleChange} />
                    <hr/>

                    <label htmlFor="category" id="icon"><BiCategory/></label>
                    <select  name="category" value={expense.category} onChange={handleChange}>
                        {expenseCategory.map(x =>
                            <option key={x.Category}>{x.Category}</option>
                        )}
                    </select>
                    <hr/>

                    <label htmlFor="note" id="icon"><MdEditNote /></label>
                    <input type="text" name='note' id='note' value={expense.note || ''} onChange={handleChange} />

                    <hr/>
                    <label htmlFor="date_added" id="icon"><BsCalendarDate /></label>
                    <input type="date" name="date_added" id="Date Added" value={expense.date_added || ''} onChange={handleChange} />

                <div >
                    <input type='submit' value='Edit' className='submitBtn' />
                    <RiDeleteBin5Line onClick={() => submitDelete(expense.id)} className="deleteBtn"  />
                </div>

            </form>

        </div>
    )
}

export default EditExpenseView