import { Route, Routes } from 'react-router-dom'
import React from "react";
import AllExpensesView from "./components/AllExpensesView/AllExpensesView";
import Header from "./components/Header/Header";
import AddExpenseView from "./components/AddExpenseView/AddExpenseView";
import LandingView from "./components/LandingView/LandingView";
import AddIncomeView from "./components/AddIncomeView/AddIncomeView";



function App() {

    return (

        <div>



            <Header/>

            <Routes>
                <Route path='/' element={<LandingView/>} />
                <Route path='/transactions' element={<AllExpensesView/>} />
                <Route path='/addExpense' element={<AddExpenseView/>} />
                <Route path='/addIncome' element={<AddIncomeView/>} />
            </Routes>

        </div>
    )

}

export default App;
