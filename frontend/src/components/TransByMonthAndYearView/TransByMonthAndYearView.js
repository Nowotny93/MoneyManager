import { AiOutlineEdit } from 'react-icons/ai';
import '../AllTransactionsView/AllTransactionsView.css';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import { HiOutlineBackspace } from 'react-icons/hi'
import { FaSortNumericDown, FaSortNumericUpAlt, FaSortAlphaDown, FaSortAlphaUpAlt } from 'react-icons/fa';
import { ImStatsBars2 } from 'react-icons/im';
import React, { useState } from "react";
import { Bar, Pie } from "react-chartjs-2";
import { CategoryScale, Chart, LinearScale, registerables } from "chart.js";
import * as FilterTransServices from '../common/FilterTransactionsService'

function FilteredTransByMonthAndYearView (){

    const objects = useLocation()
    const { month, year } = useParams()
    const navigate = useNavigate()
    Chart.register(CategoryScale);
    Chart.register(LinearScale);
    Chart.register(...registerables);
    
    const filteredTrans = objects.state['filteredTransactions']
    
    
    let monthlyIncomes = 0
    let monthlyExpenses = 0

    for (let i=0; i < filteredTrans.length; i++){
        if (filteredTrans[i].hasOwnProperty('expense')) {
            monthlyExpenses += filteredTrans[i].expense
        } else if (filteredTrans[i].hasOwnProperty('income')){
            monthlyIncomes += filteredTrans[i].income
        }
    }

    let monthlySavings = monthlyIncomes - monthlyExpenses

    let [trans, setTrans] = useState(filteredTrans)
    
    const labels = ["Incomes", "Expenses"];
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Incomes and Expenses",
          backgroundColor: [
            'cyan',
            'lightgray',
          ],
          borderColor: "blue",
          borderWidth: 1,
          data: [monthlyIncomes, monthlyExpenses],
        },
      ],
    };


    const colorMap = {
        'Car Maintenance': '#FF6384',
        'Restaurants': '#36A2EB',
        'Vouchers': '#FFCE56',
        'Salary': '#38c172',
        'Gifts': 'b548b9',
        'Family': '0f5366',
        'Phone Bill': '#73cfcf',
        'Water Bill': '#6c7bae',
        'Electricity Bill': '#19244c',
        'Gas Bill': '3c9484',
        'Television Bill': '943c77',
        'Internet Bill': '385e46',
        'Transport costs': '303536',
        'Shoes': 'c48729',
        'Clothes': '8e5b3e',
        'Sport': '1d166f',
        'Pharmacy': 'cbeeee',
        'Doctor': 'd9cbd9',
        'Education': 'e6ec17',
        'Books': '2fc828',
        'Investments': 'ed6e37',
        'Insurance': '1f1144',
        'Other': '2c0105',
        'Bonuses': '7915b6',
        'Awards': 'f0bf4d',
        'Sells': '59a8b9'
    };

    let pieChartDict = {}
    for (let i=0; i < filteredTrans.length; i++){
        if (filteredTrans[i].hasOwnProperty('expense')){
            if (filteredTrans[i].category in pieChartDict){
                pieChartDict[filteredTrans[i].category] += filteredTrans[i].expense
            }else{
                pieChartDict[filteredTrans[i].category] = filteredTrans[i].expense
            }
        }else if (filteredTrans[i].hasOwnProperty('income')){
            if (filteredTrans[i].category in pieChartDict){
                pieChartDict[filteredTrans[i].category] += filteredTrans[i].income
            }else{
                pieChartDict[filteredTrans[i].category] = filteredTrans[i].income
            }
        }
    }

    const labelsPieChart = [...new Set(filteredTrans.map((item) => item.category))]
    const colors = labelsPieChart.map(l => colorMap[l]);
    const transData = labelsPieChart.map(t => pieChartDict[t])

    const dataPieChart = {
      labels: labelsPieChart,
      datasets: [
        {
          label: "Amount",
          backgroundColor: colors,
          borderColor: "blue",
          borderWidth: 1,
          data: transData,
        },
      ],
    };



    const sortByNameAscending = (e) => {
        const transCopy = [...trans]
        let sortedAsc = FilterTransServices.getSortByNameAscending(transCopy)
        setTrans(sortedAsc)

    }

    const sortByNameDescending = (e) => {
        const transCopy = [...trans]
        let sortedDesc = FilterTransServices.getSortByNameDescending(transCopy)
        setTrans(sortedDesc)

    }

    const sortByDateAscending = (e) => {
        const transCopy = [...trans]
        let sortedAsc = FilterTransServices.getSortByDateAscending(transCopy)
        setTrans(sortedAsc)
    }

    const sortByDateDescending = (e) => {
        const transCopy = [...trans]
        let sortedDesc = FilterTransServices.getSortByDateDescending(transCopy)
        setTrans(sortedDesc)
    }
    
    function goBack (){
        navigate('/transactions')
    }

    let [chart, setChart] = useState({})
    let [pieChart, setpieChart] = useState({})

    function showChart(){
        setpieChart(!pieChart)
        setChart(!chart)
    }

    

    const BarChartResults = () => (
        <div className='barChart'>
            <Bar
                datasetIdKey='id'
                data={data}
                />
        </div>
    )

    const PieChartResults = () => (
        <div className='pieChart'>
            <Pie
                datasetIdKey='id'
                data={dataPieChart}
                />
        </div>
    )
    
    if (filteredTrans.length !== 0){
        return (
            <div>
            <h1>All transactions for {month} / {year}</h1>
                <div  className="filterByMonthField">
                    <div className="filterByMonthLabel">
                        - Incomes: 
                    </div>
                        <div className="card"  style={{backgroundColor: "cyan"}}>
                            {monthlyIncomes} lv.
                        </div>
                    <div className="filterByMonthLabel">
                        - Expenses: 
                    </div>
                        <div className="card"  style={{backgroundColor: "lightgray"}}>
                            {monthlyExpenses} lv.
                        </div>
                    <div className="filterByMonthLabel">
                        - Savings: 
                    </div>
                        <div className="card" style={{color: monthlySavings < 0 ? "red" : "blue"}}>
                            {monthlySavings} lv.
                        </div>
                        <HiOutlineBackspace className="backBtn" onClick={goBack}/>
                        <ImStatsBars2 className="chartBtn" onClick={showChart}/>
                </div>
                <div className='chart'>
                    {chart ? null : <BarChartResults />}
                    {pieChart ? null: <PieChartResults />}    
                </div>
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
                    {trans.map((item) => (
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
    return (
        <div>
        <h1>Still no transactions for {month} / {year}</h1>
        <div  className="filterByMonthField">
                    <div className="filterByMonthLabel">
                        - Incomes: 
                    </div>
                        <div className="card"  style={{backgroundColor: "cyan"}}>
                            {monthlyIncomes} lv.
                        </div>
                    <div className="filterByMonthLabel">
                        - Expenses: 
                    </div>
                        <div className="card"  style={{backgroundColor: "lightgray"}}>
                            {monthlyExpenses} lv.
                        </div>
                    <div className="filterByMonthLabel">
                        - Savings: 
                    </div>
                        <div className="card" style={{color: monthlySavings < 0 ? "red" : "blue"}}>
                            {monthlySavings} lv.
                        </div>
                        <HiOutlineBackspace className="backBtn" onClick={goBack}/>
                </div>    
        <table>
            <thead>
                <tr>
                    <th>Item</th>
                    <th>Amount</th>
                    <th>Note</th>
                    <th>Date</th>
                </tr>
            </thead>
        </table>
        </div>
    )
}

export default FilteredTransByMonthAndYearView