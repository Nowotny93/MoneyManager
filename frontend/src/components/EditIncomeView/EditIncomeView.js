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

function EditIncomeView() {

    const params = useParams()
    const history = useNavigate()

    let [income, setIncome] = useState({})

    useEffect(() => {
        Services.getOneIncome(params.id)
            .then(res => setIncome(res))
    }, [])

    let [incomeCategory, setIncomeCategory] = useState([])

    useEffect(() => {
        Services.getIncomeCategories()
            .then(res => setIncomeCategory(res))
    }, [])

    const handleChange = (e) => {
        setIncome({...income, [e.target.name]: e.target.value})
    }

    function onIncomeEditSubmit(e) {
        e.preventDefault()

        let updatedIncome = {...income, [e.target.name]: e.target.value}

        Services.updateIncome(params.id, updatedIncome)
            .then(() => {
                history('/transactions');
                return;
        })
    }

    const handleDelete = (id) => {
        Services.deleteIncome(id)
        .then(() => {
                history('/transactions');
                return;
        })
    }

    const submitDelete = (id) => {

    confirmAlert({
      title: 'Confirm to delete',
      message: 'Are you sure you want to delete this income?',
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
            <h1>Edit Income</h1>
            <form onSubmit={onIncomeEditSubmit}>
                    <label htmlFor="income" id="icon"><HiOutlineCurrencyDollar /></label>
                    <input type="number" name='income' id='income' value={income.income || ''} onChange={handleChange} />
                    <hr/>

                    <label htmlFor="category" id="icon"><BiCategory/></label>
                    <select  name="category" value={income.category} onChange={handleChange}>
                        {incomeCategory.map(x =>
                            <option key={x.Category}>{x.Category}</option>
                        )}
                    </select>
                    <hr/>

                    <label htmlFor="note" id="icon"><MdEditNote /></label>
                    <input type="text" name='note' id='note' value={income.note || ''} onChange={handleChange} />

                    <hr/>
                    <label htmlFor="date_added" id="icon"><BsCalendarDate /></label>
                    <input type="date" name="date_added" id="Date Added" value={income.date_added || ''} onChange={handleChange} />

                <div>
                    <input type='submit' value='Edit' className='submitBtn' />
                    <RiDeleteBin5Line onClick={() => submitDelete(income.id)} className="deleteBtn"  />
                </div>

            </form>
        </div>
    )

}

export default EditIncomeView