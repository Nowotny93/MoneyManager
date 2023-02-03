import React, {useState} from "react";
import './Header.css'
import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi';
import { AiOutlineHome } from 'react-icons/ai'
import { TbReportMoney, TbZoomMoney } from 'react-icons/tb';
import { RiAccountCircleFill } from 'react-icons/ri';
import { useNavigate } from "react-router-dom";

function Header() {

    const navigate = useNavigate()

    function navigateHome() {
        navigate('/home')
    }

    function navigateTransactions() {
        navigate('/transactions')
    }

    function navigateAddExpense() {
        navigate('/addExpense')
    }

    function navigateAddIncome() {
        navigate('/addIncome')
    }

    function navigateBudgets() {
        navigate('/budgets')
    }

    let [csrfToken, setCsrfToken] = useState([])

    const getCSRF = () => {
        fetch("http://localhost:8000/manager/csrf/", {
            credentials: "include",
        })
        .then((res) => {
            let csrfToken = res.headers.get("X-CSRFToken");
            setCsrfToken(csrfToken);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    let [isAuthenticated, setIsAuthenticated] = useState([])

    function navigateAccount() {
        fetch("http://localhost:8000/manager/logout/", {
            headers: {
            "Content-Type": "application/json",
            },
            credentials: "include",
        })
        // .then(this.isResponseOk)
        .then((data) => {
            console.log(data);
            setIsAuthenticated(false);
            getCSRF();
        })
        .catch((err) => {
            console.log(err);
        });
        navigate('/')
    }

    return (
        <div>

            <header className="header">
                <div className="headerPositioning">
                    <ul onClick={navigateHome}>
                        <AiOutlineHome className="headerButtons" />
                        <p className="headerBtnTexts">Home</p>
                    </ul>
                    <ul onClick={navigateTransactions}>
                        <TbZoomMoney className="headerButtons" />
                        <p className="headerBtnTexts">Transactions</p>
                    </ul>
                    <ul onClick={navigateAddExpense}>
                        <GiPayMoney className="headerButtons" />
                        <p className="headerBtnTexts">Add Expense</p>
                    </ul>
                    <ul onClick={navigateAddIncome}>
                        <GiReceiveMoney className="headerButtons" />
                        <p className="headerBtnTexts">Add Income</p>
                    </ul>
                    <ul onClick={navigateBudgets}>
                        <TbReportMoney className="headerButtons" />
                        <p className="headerBtnTexts">Budgets</p>
                    </ul>
                    <ul onClick={navigateAccount}>
                        <RiAccountCircleFill className="headerButtons" />
                        <p className="headerBtnTexts">Logout</p>
                    </ul>
                </div>
            </header>

        </div>
    )
}

export default Header