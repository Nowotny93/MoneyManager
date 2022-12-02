import React, { useEffect, useState } from "react";
import * as Services from "../Services/Services";
import './AllExpensesView.css';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { AiOutlineEdit } from 'react-icons/ai';

function AllTransactionsView (){


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

    let allTransactions = expenses.concat(incomes)



    return (

      <div>
        <h1>Money Manager</h1>
          <table>
              <thead>
                    <tr>
                        <th>Item</th>
                        <th>Amount</th>
                        <th>Note</th>
                        <th>Date</th>
                    </tr>
              </thead>
              <tbody>
                {allTransactions.map((item) => (
                    item.hasOwnProperty('expense')?
                    <tr key={item.id}  className="expenseRow">
                        <td>
                            {item.category}
                            <AiOutlineEdit className="rowBtn" />
                            <RiDeleteBin5Line className="rowBtn" />
                        </td>
                        <td>- {item.expense} lv.</td>
                        <td>{item.note}</td>
                        <td>{item.date_added}</td>

                    </tr> :
                    <tr key={item.id} className="incomeRow">
                        <td>
                            {item.category}
                            <AiOutlineEdit className="rowBtn" />
                            <RiDeleteBin5Line className="rowBtn" />
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