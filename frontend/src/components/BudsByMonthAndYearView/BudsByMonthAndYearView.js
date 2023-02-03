import { AiOutlineEdit } from 'react-icons/ai';
import '../AllTransactionsView/AllTransactionsView.css';
import { useLocation, useParams, useNavigate, Link } from 'react-router-dom';
import { HiOutlineBackspace } from 'react-icons/hi'
import { FaSortNumericDown, FaSortNumericUpAlt, FaSortAlphaDown, FaSortAlphaUpAlt } from 'react-icons/fa';
import { ImStatsBars2 } from 'react-icons/im';
import React, { useEffect, useState } from "react";
import * as FilterTransServices from '../common/FilterTransactionsService'


import * as Services from "../Services/Services";
import './BudsByMonthAndYearView.css'

import {
    Chart as ChartJS,
    PointElement,
    CategoryScale,
    LineElement,
    LinearScale,
    Title,
    Tooltip,
    Filler,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';



function FilteredBudsByMonthAndYearView (){

    const objects = useLocation()
    const { month, year } = useParams()
    const navigate = useNavigate()

    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Filler,
        Legend
      );



    const filteredBuds = objects.state['filteredBudgets']

    let [user, setUser] = useState([])

    useEffect(() => {
        Services.whoAmI()
            .then(data => setUser(data.username))
    }, [])
    

    let [buds, setBuds] = useState(filteredBuds)

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

    function goBack (){
        navigate('/budgets')
    }

    const sortByNameAscending = (e) => {
        const budsCopy = [...buds]
        let sortedAsc = FilterTransServices.getSortByNameAscending(budsCopy)
        setBuds(sortedAsc)

    }

    const sortByNameDescending = (e) => {
        const budsCopy = [...buds]
        let sortedDesc = FilterTransServices.getSortByNameDescending(budsCopy)
        setBuds(sortedDesc)

    }

    const sortByDateAscending = (e) => {
        const budsCopy = [...buds]
        let sortedAsc = FilterTransServices.getSortByDateAscending(budsCopy)
        setBuds(sortedAsc)
    }

    const sortByDateDescending = (e) => {
        const budsCopy = [...buds]
        let sortedDesc = FilterTransServices.getSortByDateDescending(budsCopy)
        setBuds(sortedDesc)
    }

    let [chart, setChart] = useState({})
    let [chartProgressData, setChartProgressData] = useState('')

    function showChart(e){
        e.preventDefault()
        
        let progressNum = (e.currentTarget.parentNode.nextSibling.nextSibling.textContent).split('%')[0]
        setChartProgressData(progressNum)
        setChart(!chart)
    }

    const options = {
        responsive: true,
        plugins: {
          legend: null,
          title: {
            display: true,
            text: 'Budget fulfilment',
          },
        },
        
      };
    
      const labels = ['', 'Expenses in %'];

      const data = {
        labels,
        datasets: [
          {
            fill: true,
            label: 'Expenses',
            data: [0, chartProgressData, 100],
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
          },
        ],
      };

    const BarChartResults = () => (
        <div>
            <Line
                datasetIdKey='id'
                options={options}
                data={data}
                />
        </div>
    )

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
                        <span style={labelStyles} id='itemProgress'>{`${progress}%`}</span>
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

    if (filteredBuds.length !== 0){
        return (
            <div>
            <h1>All budgets for {month} / {year}</h1>
                <div  className="filterByMonthField">
                    <HiOutlineBackspace  id='backBtnFilteredBuds'  onClick={goBack}/>
                    
                </div>
                <div className='chart'>
                    {chart ? null : <BarChartResults />}
                     
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>
                                Item
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
                    <tbody id='hey'>
                        {buds.map((item) => (
                            
                            <tr key={item.id + item.budget} className="expenseRow" >
                                <td>
                                    {item.category}
                                    
                                    <Link to={'/edit/budget/' + item.id}>
                                        <AiOutlineEdit className="rowBtn" />
                                    </Link>    
                                    <ImStatsBars2 className="rowBtn" onClick={showChart} />
                                </td>
                                <td>{item.budget} lv.</td>
                                <td>{ProgressBar(item.budget, item.category, item.date_added)}</td>
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
        <h1>Still no budgets set for {month} / {year}</h1>
        <div  className="filterByMonthField">
                    
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

export default FilteredBudsByMonthAndYearView