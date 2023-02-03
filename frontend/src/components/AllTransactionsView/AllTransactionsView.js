import React, { useEffect, useState } from "react";
import {Link, useNavigate, useParams} from 'react-router-dom'
import * as Services from "../Services/Services";
import './AllTransactionsView.css';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaSortNumericDown, FaSortNumericUpAlt, FaSortAlphaDown, FaSortAlphaUpAlt } from 'react-icons/fa';
import * as FilterTransServices from '../common/FilterTransactionsService'


function AllTransactionsView (){

    const navigate = useNavigate()

    let [expenses, setExpenses] = useState([])

    useEffect(() => {
        Services.getAllExpenses()
            .then(res => setExpenses(res))
    }, [])

    let [incomes, setIncomes] = useState([])

    useEffect(() => {
        Services.getAllIncomes()
            .then(res => setIncomes(res))
    }, [])

    let [user, setUser] = useState([])

    useEffect(() => {
        Services.whoAmI()
            .then(data => setUser(data.username))
    }, [])

    let [allTransactions, setAllTransactions] = useState([])
        
    useEffect(() => {
        const concatTrans = expenses.concat(incomes)
        let userTrans = []
        for (let i=0; i < concatTrans.length; i++){
            if (concatTrans[i].user === user){
                userTrans.push(concatTrans[i])
            }
        }
        console.log(userTrans)
        setAllTransactions(userTrans)
    }, [expenses, incomes])

    const onFilterEvent = (e) => {
        e.preventDefault()
        const allTransactionsCopy = [...allTransactions]
        const {month, year} = e.target
        
        let filteredTransactions = FilterTransServices.getFilteredTransArr(allTransactionsCopy, month.value, year.value)
        navigate('/transactions/'+ month.value + '/' + year.value, {state: {filteredTransactions}})
    }


    const sortByNameAscending = (e) => {
        const allTransactionsCopy = [...allTransactions]
        let sortedAsc = FilterTransServices.getSortByNameAscending(allTransactionsCopy)
        setAllTransactions(sortedAsc)

    }

    const sortByNameDescending = (e) => {
        const allTransactionsCopy = [...allTransactions]
        let sortedDesc = FilterTransServices.getSortByNameDescending(allTransactionsCopy)
        setAllTransactions(sortedDesc)

    }

    const sortByDateAscending = (e) => {
        const allTransactionsCopy = [...allTransactions]
        let sortedAsc = FilterTransServices.getSortByDateAscending(allTransactionsCopy)
        setAllTransactions(sortedAsc)
    }

    const sortByDateDescending = (e) => {
        const allTransactionsCopy = [...allTransactions]
        let sortedDesc = FilterTransServices.getSortByDateDescending(allTransactionsCopy)
        setAllTransactions(sortedDesc)
    }


    return (
      <div>
        <h1>All transactions</h1>
        <form className="filterByMonthField" onSubmit={onFilterEvent}>
            <div className="filterByMonthLabel">
                Choose a month and year:
            </div>
                <select className="selectMonth" name="month">
                    <option>January</option>
                    <option>February</option>
                    <option>March</option>
                    <option>April</option>
                    <option>May</option>
                    <option>June</option>
                    <option>July</option>
                    <option>August</option>
                    <option>September</option>
                    <option>October</option>
                    <option>November</option>
                    <option>December</option>
                </select>
                <select className="selectYear" name="year">
                    <option>2022</option>
                    <option selected>2023</option>
                    <option>2024</option>
                </select>
                    <input type='submit' value="Filter" className="filterBtn"/>
        </form>
          <table>
              <thead>
                    <tr>
                        <th>
                            Category
                            <FaSortAlphaDown className="rowBtn" onClick={sortByNameAscending} />
                            <FaSortAlphaUpAlt className="rowBtn" onClick={sortByNameDescending} />
                        </th>
                        <th>Amount</th>
                        <th>Note</th>
                        <th>
                            Date
                            <FaSortNumericDown className="rowBtn" onClick={sortByDateAscending}/>
                            <FaSortNumericUpAlt className="rowBtn" onClick={sortByDateDescending}/>
                        </th>
                    </tr>
              </thead>
              <tbody>
                {allTransactions.map((item) => (
                    item.hasOwnProperty('expense')?
                    <tr key={item.id + item.expense} className="expenseRow">
                        <td>
                            {item.category}
                            <Link to={'/edit/expense/' + item.id}>
                                <AiOutlineEdit className="rowBtn" />
                            </Link>    
                        </td>
                        <td>- {item.expense} lv.</td>
                        <td>{item.note}</td>
                        <td>{item.date_added}</td>

                    </tr> :
                    <tr key={item.id + item.income} className="incomeRow">
                        <td>
                            {item.category}
                            <Link to={'/edit/income/' + item.id}>
                                <AiOutlineEdit className="rowBtn" />
                            </Link>
                        </td>
                        <td>+ {item.income} lv.</td>
                        <td>{item.note}</td>
                        <td>{item.date_added}</td>
                    </tr>
                ))}
              </tbody>
          </table>
      </div>
    );
}

export default AllTransactionsView