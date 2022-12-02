import React from "react";
import './Header.css'

import { GiReceiveMoney, GiPayMoney } from 'react-icons/gi';
import { AiOutlineHome } from 'react-icons/ai'
import { TbReportMoney, TbZoomMoney } from 'react-icons/tb';
import { RiAccountCircleFill } from 'react-icons/ri';
import {Link} from "react-router-dom";

function Header() {
    return (
        <div>

            <header className="header">
                <div className="headerPositioning">
                    <Link to='/' style={{textDecoration: 'none'}}>
                        <ul>
                            <AiOutlineHome className="headerButtons" />
                            <p className="headerBtnTexts">Home</p>
                        </ul>
                    </Link>
                    <Link to='/transactions' style={{textDecoration: 'none'}}>
                        <ul>
                            <TbZoomMoney className="headerButtons" />
                            <p className="headerBtnTexts">Transactions</p>
                        </ul>
                    </Link>
                    <Link to='/addExpense' style={{textDecoration: 'none'}}>
                        <ul>
                            <GiPayMoney className="headerButtons" />
                            <p className="headerBtnTexts">Add Expense</p>
                        </ul>
                    </Link>
                    <Link to='/addIncome' style={{textDecoration: 'none'}}>
                        <ul>
                            <GiReceiveMoney className="headerButtons" />
                            <p className="headerBtnTexts">Add Income</p>
                        </ul>
                    </Link>
                    <ul>
                        <TbReportMoney className="headerButtons" />
                        <p className="headerBtnTexts">Budgets</p>
                    </ul>
                    <ul>
                        <RiAccountCircleFill className="headerButtons" />
                        <p className="headerBtnTexts">Account</p>
                    </ul>
                </div>
            </header>

        </div>
    )
}

export default Header