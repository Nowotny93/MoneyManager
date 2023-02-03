import '../AddExpenseView/AddExpenseView.css';
import {HiOutlineCurrencyDollar} from "react-icons/hi";
import {BiCategory} from "react-icons/bi";
import './EditBudgetView.css'
import {BsCalendarDate} from "react-icons/bs";
import React, {useEffect, useState} from "react";
import * as Services from "../Services/Services";
import {useNavigate, useParams} from "react-router";
import {RiDeleteBin5Line} from "react-icons/ri";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

function EditBudgetView() {

    const params = useParams()
    const history = useNavigate()

    let [budget, setBudget] = useState({})

    useEffect(() => {
        Services.getOneBudget(params.id)
            .then(res => setBudget(res))
    }, [params])

    let [expenseCategory, setExpenseCategory] = useState([])

    useEffect(() => {
        Services.getExpenseCategories()
            .then(res => setExpenseCategory(res))
    }, [])

    const handleChange = (e) => {
        setBudget({...budget, [e.target.name]: e.target.value})
    }

    function onBudgetEditSubmit(e) {
        e.preventDefault()

        let updatedBudget = {...budget, [e.target.name]: e.target.value}

        Services.updateBudget(params.id, updatedBudget)
            .then(() => {
                history('/budgets');
                return;
        })
    }

    const handleDelete = (id) => {
        Services.deleteBudget(id)
        .then(() => {
                history('/budgets');
                return;
        })
    }

    const submitDelete = (id) => {

    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this budget?',
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
        <div className="main-block-editBudget">
            <h1>Edit Budget</h1>
            <form onSubmit={onBudgetEditSubmit}>
                    <label htmlFor="budget" id="icon"><HiOutlineCurrencyDollar /></label>
                    <input type="number" name='budget' id='budget' value={budget.budget || ''} onChange={handleChange} />
                    <hr/>

                    <label htmlFor="category" id="icon"><BiCategory/></label>
                    <select  name="category" value={budget.category} onChange={handleChange}>
                        {expenseCategory.map(x =>
                            <option key={x.Category}>{x.Category}</option>
                        )}
                    </select>
                    <hr/>

                    <label htmlFor="date_added" id="icon"><BsCalendarDate /></label>
                    <input type="text" name="date_added" id="Date Added" value={budget.date_added || ''} onChange={handleChange} />

                <div >
                    <input type='submit' value='Edit' className='submitBtn' />
                    <RiDeleteBin5Line onClick={() => submitDelete(budget.id)} className="deleteBtn"  />
                </div>
            </form>
        </div>
    )
}

export default EditBudgetView