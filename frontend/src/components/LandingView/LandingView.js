import React, {useEffect, useState} from "react";
import * as Services from '../Services/Services'

function LandingView() {

    let [budget, setBudget] = useState({})

    useEffect(() => {
        Services.getBudget()
            .then(res => setBudget(res))
    }, [])

    return (
        <h2>This is your budget: {budget.Budget} lv.</h2>
    )
}

export default LandingView