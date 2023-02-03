import { Route, Routes, useLocation } from 'react-router-dom'
import React, {useState, useEffect} from "react";
import AllTransactionsView from "./components/AllTransactionsView/AllTransactionsView";
import Header from "./components/Header/Header";
import AddExpenseView from "./components/AddExpenseView/AddExpenseView";
import LandingView from "./components/LandingView/LandingView";
import AddIncomeView from "./components/AddIncomeView/AddIncomeView";
import EditExpenseView from "./components/EditExpenseView/EditExpenseView";
import EditIncomeView from "./components/EditIncomeView/EditIncomeView";
import FilteredTransByMonthAndYearView from './components/TransByMonthAndYearView/TransByMonthAndYearView';
import AllBudgetsView from "./components/AllBudgetsView/AllBudgetsView";
import AddBudgetView from './components/AddBudgetView/AddBudgetView';
import EditBudgetView from './components/EditBudgetView/EditBudgetView';
import FilteredBudsByMonthAndYearView from './components/BudsByMonthAndYearView/BudsByMonthAndYearView';
import LoginView from './components/AuthView/LoginView';
import RegisterView from './components/AuthView/RegisterView';


function App() {

    const history = useLocation()

    let [isAuthenticated, setIsAuthenticated] = useState([])

    useEffect( () => {
        fetch("http://localhost:8000/manager/session/", {
          credentials: "include",
        })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.isAuthenticated) {
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      })


    return (
      <div>
          {
          history.pathname!=='/' && history.pathname!=='/register' && isAuthenticated ? <Header/>:null
          }
          <Routes>
              <Route path='/' element={<LoginView/>}/>
              <Route path='/register' element={<RegisterView/>} />
              <Route path='/home' element={<LandingView/>} /> 
              <Route path='/transactions' element={<AllTransactionsView/>} /> 
              <Route path='/addExpense' element={<AddExpenseView/>} /> 
              <Route path='/addIncome' element={<AddIncomeView/>} /> 
              <Route path='/edit/expense/:id' element={<EditExpenseView/>} /> 
              <Route path='/edit/income/:id' element={<EditIncomeView/>} /> 
              <Route path='/transactions/:month/:year' element={<FilteredTransByMonthAndYearView/>} /> 
              <Route path='/budgets' element={<AllBudgetsView/>} /> 
              <Route path='/addBudget' element={<AddBudgetView/>} /> 
              <Route path='/edit/budget/:id' element={<EditBudgetView/>} /> 
              <Route path='/budgets/:month/:year' element={<FilteredBudsByMonthAndYearView/>} />
          </Routes>
      </div>
    )
}

export default App;
