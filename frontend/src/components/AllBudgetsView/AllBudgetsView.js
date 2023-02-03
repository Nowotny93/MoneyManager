import React, {useEffect, useState} from "react";
import * as Services from "../Services/Services";
import { MdAddCircleOutline } from 'react-icons/md'
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEdit } from 'react-icons/ai';
import { FaSortNumericDown, FaSortNumericUpAlt, FaSortAlphaDown, FaSortAlphaUpAlt } from 'react-icons/fa';
import * as FilterTransServices from '../common/FilterTransactionsService'

function AllBudgetsView (){

    const navigate = useNavigate()

    let [user, setUser] = useState([])

    useEffect(() => {
        Services.whoAmI()
            .then(data => setUser(data.username))
    }, [])

    let [budgets, setBudgets] = useState([])

    useEffect(() => {
        Services.getAllBudgets()
            .then(res => setBudgets(res))
    }, [])

    let [expenses, setExpenses] = useState([])

    useEffect(() => {
        Services.getAllExpenses()
            .then(res => setExpenses(res))
    }, [])

    let userExp = []
    for (let i=0; i < expenses.length; i++){
        if (expenses[i].user === user){
            userExp.push(expenses[i])
        }
    }

    let userBud = []
    for (let i=0; i < budgets.length; i++){
        if (budgets[i].user === user){
            userBud.push(budgets[i])
        }
    }

    function navigateAddBudget() {
        navigate('/addBudget')
    }

    const sortByNameAscending = (e) => {
        const budgetsCopy = [...userBud]
        let sortedAsc = FilterTransServices.getSortByNameAscending(budgetsCopy)
        setBudgets(sortedAsc)

    }

    const sortByNameDescending = (e) => {
        const budgetsCopy = [...userBud]
        let sortedDesc = FilterTransServices.getSortByNameDescending(budgetsCopy)
        setBudgets(sortedDesc)

    }

    const sortByDateAscending = (e) => {
        const budgetsCopy = [...userBud]
        let sortedAsc = FilterTransServices.getSortByDateAscending(budgetsCopy)
        setBudgets(sortedAsc)
    }

    const sortByDateDescending = (e) => {
        const budgetsCopy = [...userBud]
        let sortedDesc = FilterTransServices.getSortByDateDescending(budgetsCopy)
        setBudgets(sortedDesc)
    }

    const onFilterEvent = (e) => {
        e.preventDefault()
        const budgetsCopy = [...userBud]
        const {month, year} = e.target
        
        let filteredBudgets = FilterTransServices.getFilteredTransArr(budgetsCopy, month.value, year.value)
        navigate('/budgets/'+ month.value + '/' + year.value, {state: {filteredBudgets}})
    }

    function ProgressBar  (budget, categoryBudget, dateBudget)  {

        let year = (dateBudget.split('-'))[0]
        let month = (dateBudget.split('-'))[1]
        let currentExpenses = 0
        for (let i=0; i < userExp.length; i++){
            let dateAddedSplitted = (userExp[i].date_added).split('-')
            let monthAdded = dateAddedSplitted[1]
            let yearAdded = dateAddedSplitted[0]
            let category = userExp[i].category
            if (year === yearAdded && monthAdded === month && category === categoryBudget){
                currentExpenses += userExp[i].expense
            }
        }

        let progress = ((currentExpenses / budget) * 100) <= 100 ? (((currentExpenses / budget) * 100)).toFixed(1) : 100
        
        const containerStyles = {
          height: 20,
          width: '100%',
          backgroundColor: "#e0e0de",
          borderRadius: 50,
          margin: 0,
          
          
        }
      
        const fillerStyles = {
          height: '100%',
          width: `${progress}%`,
          backgroundColor: budget < currentExpenses ? 'red' : 'blue',
          borderRadius: 'inherit',
          textAlign: 'right'
        }
      
        const labelStyles = {
          padding: 5,
          color: 'white',
          fontWeight: 'bold'
        }

        const tdExceededStyles = {
            backgroundColor: budget < currentExpenses ? 'lightcoral': null,
            borderRadius: 10,
            border: '#cbc9c9',
            
        }

        return (
            <div style={tdExceededStyles}>
                <div style={containerStyles}>
                    <div style={fillerStyles}>
                        <span style={labelStyles}>{`${progress}%`}</span>
                    </div>
                </div>
                {currentExpenses < budget ?
                <div>
                    <span>Total spent: {currentExpenses} lv.</span>
                </div> :
                <div>
                    <span>Budget exceeded with: {currentExpenses - budget} lv.</span>
                </div>}
            </div>
        )
    }


    return (
        <div>
            <h1>All budgets</h1>
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
                    <MdAddCircleOutline className="backBtn" onClick={navigateAddBudget}/>
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
                        <th>Progress</th>
                        <th>
                            Date
                            <FaSortNumericDown className="rowBtn" onClick={sortByDateAscending}/>
                            <FaSortNumericUpAlt className="rowBtn" onClick={sortByDateDescending}/>
                        </th>
                    </tr>
              </thead>
              <tbody>
                {userBud.map((item) => (
                    
                    <tr key={item.id + item.budget} className="expenseRow" >
                        <td>
                            {item.category}
                            <Link to={'/edit/budget/' + item.id}>
                                <AiOutlineEdit className="rowBtn" />
                            </Link>    
                        </td>
                        <td>{item.budget} lv.</td>
                        <td>{ProgressBar(item.budget, item.category, item.date_added)}</td>
                        <td>{item.date_added}</td>
                    </tr>
                ))}
              </tbody>
            </table>
        </div>
    )
}

export default AllBudgetsView