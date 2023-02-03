import React, {useEffect, useState} from "react";
import { useLocation } from 'react-router-dom';
import * as Services from '../Services/Services'
import { Bar } from "react-chartjs-2";
import { CategoryScale, Chart, LinearScale, registerables } from "chart.js";
import './LandingView.css';
import * as FilterTransServices from '../common/FilterTransactionsService'


function LandingView() {

    // let [budget, setBudget] = useState({})

    // useEffect(() => {
    //     Services.getBudget()
    //         .then(res => setBudget(res))
    // }, [])

    const objects = useLocation()
    console.log(objects)

    Chart.register(CategoryScale);
    Chart.register(LinearScale);
    Chart.register(...registerables);


    let [user, setUser] = useState([])

    useEffect(() => {
        Services.whoAmI()
            .then(data => setUser(data.username))
    }, [])
    

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

    

    let [allTransactions, setAllTransactions] = useState([])
        
    useEffect(() => {
        const concatTrans = expenses.concat(incomes)
        let userTrans = []
        for (let i=0; i < concatTrans.length; i++){
            if (concatTrans[i].user === user){
                userTrans.push(concatTrans[i])
            }
        }
        setAllTransactions(userTrans)
    }, [expenses, incomes])


    let userInc = []
    for (let i=0; i < incomes.length; i++){
        if (incomes[i].user === user){
            userInc.push(incomes[i])
        }
    }

    let userExp = []
    for (let i=0; i < expenses.length; i++){
        if (expenses[i].user === user){
            userExp.push(expenses[i])
        }
    }
    

    let recentIncomes = userInc.slice(-2)
    let recentExpenses = userExp.slice(-2)
    const recentTrans = recentIncomes.concat(recentExpenses)

    let topSpendings = ((userExp.sort((a, b) => (a.expense > b.expense) ? 1 : -1)).slice(-4)).reverse()
    let topIncomes = ((userInc.sort((a, b) => (a.income > b.income) ? 1 : -1)).slice(-4)).reverse()
    
    let budget = 0
    for (let i=0; i < allTransactions.length; i++){
        if (allTransactions[i].hasOwnProperty('expense')){
            budget -= allTransactions[i].expense
        }else if (allTransactions[i].hasOwnProperty('income')){
            budget += allTransactions[i].income
        }
    }
    

    let [chartData, setChartData] = useState('')

    

    const onFilterEvent = (e) => {
        e.preventDefault()
        const allTransactionsCopy = [...allTransactions]
        const {month1, year1, month2, year2} = e.target

        let filteredTransactions1 = FilterTransServices.getFilteredTrans(allTransactionsCopy, month1.value, year1.value)
        let filteredTransactions2 = FilterTransServices.getFilteredTrans(allTransactionsCopy, month2.value, year2.value)

        const labels = [month1.value + '/' + year1.value, month2.value + '/' + year2.value]
        let month1Color = filteredTransactions1 < 0 ? "red" : "blue"
        let month2Color = filteredTransactions2 < 0 ? "red" : "blue"
        
        const data = {
        labels: labels,
        datasets: [
            {
            label: "Savings Comparison",
            backgroundColor: [
                month1Color,
                month2Color,
            ],
            borderColor: "blue",
            borderWidth: 1,
            data: [filteredTransactions1, filteredTransactions2],
            },
        ],
        }

        setChartData(data)
    }

    const BarChartResults = () => (
        <div className='chartSavings'>
            <div id='barChartSavings'>
                <Bar
                    datasetIdKey='id'
                    data={chartData}
                    />
            </div>
        </div>
    )


    return (
        <div>
            <h1>This is your budget: {budget} lv.</h1>
            {/* <div className="budgetField">
                <h4>This is your budget: {budget.Budget} lv.</h4>
            </div> */}
            <form className="filterByMonthField" onSubmit={onFilterEvent}>
                <div className="filterByMonthLabel">
                    Compare savings from
                </div>
                <select className="selectMonth" name="month1">
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
                <select className="selectYear" name="year1">
                    <option>2022</option>
                    <option selected>2023</option>
                    <option>2024</option>
                </select>
                <div className="filterByMonthLabel">
                    with
                </div>
                <select className="selectMonth" name="month2">
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
                <select className="selectYear" name="year2">
                    <option>2022</option>
                    <option selected>2023</option>
                    <option>2024</option>
                </select>
                <input type='submit' value="Filter" className="filterBtn"/>
            </form>
            <div>
                    {chartData ? <BarChartResults/> : null}   
            </div>
            <div className="tableSection">
                <div className="recentTransLabel">
                    Your last transactions:
                </div>
                <table id="recentTransTable">
                    <thead>
                            <tr>
                                <th>
                                    Category
                                </th>
                                <th>Amount</th>
                                <th>Note</th>
                                <th>
                                    Date
                                </th>
                            </tr>
                    </thead>
                    <tbody>
                        {recentTrans.map((item) => (
                            item.hasOwnProperty('expense')?
                            <tr key={item.id + item.expense} className="expenseRow">
                                <td>
                                    {item.category}
                                </td>
                                <td>- {item.expense} lv.</td>
                                <td>{item.note}</td>
                                <td>{item.date_added}</td>

                            </tr> :
                            <tr key={item.id + item.income} className="incomeRow">
                                <td>
                                    {item.category}
                                </td>
                                <td>+ {item.income} lv.</td>
                                <td>{item.note}</td>
                                <td>{item.date_added}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="tableSection">
                <div className="recentTransLabel">
                    Your top spendings:
                </div>
                <table id="topSpendingsTable">
                    <thead>
                            <tr>
                                <th>
                                    Item
                                </th>
                                <th>Amount</th>
                                <th>Note</th>
                                <th>
                                    Date
                                </th>
                            </tr>
                    </thead>
                    <tbody>
                        {topSpendings.map((item) => (
                            <tr key={item.id + item.expense} className="expenseRow">
                                <td>
                                    {item.category}
                                </td>
                                <td>- {item.expense} lv.</td>
                                <td>{item.note}</td>
                                <td>{item.date_added}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="tableSection">
                <div className="recentTransLabel">
                    Your top incomes:
                </div>
                <table id="topIncomesTable">
                    <thead>
                            <tr>
                                <th>
                                    Item
                                </th>
                                <th>Amount</th>
                                <th>Note</th>
                                <th>
                                    Date
                                </th>
                            </tr>
                    </thead>
                    <tbody>
                        {topIncomes.map((item) => (
                            <tr key={item.id + item.income} className="incomeRow">
                                <td>
                                    {item.category}
                                </td>
                                <td>+ {item.income} lv.</td>
                                <td>{item.note}</td>
                                <td>{item.date_added}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default LandingView

