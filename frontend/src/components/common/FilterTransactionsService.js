export const getFilteredTrans = (trans, month, year) => {
    let monthInNumbers = []
    
    if (month === "January"){
        monthInNumbers.push('01')
    }else if (month === "February"){
        monthInNumbers.push('02')
    }else if (month === "March"){
        monthInNumbers.push('03')
    }else if (month === "April"){
        monthInNumbers.push('04')
    }else if (month === "May"){
        monthInNumbers.push('05')
    }else if (month === "June"){
        monthInNumbers.push('06')
    }else if (month === "July"){
        monthInNumbers.push('07')
    }else if (month === "August"){
        monthInNumbers.push('08')
    }else if (month === "September"){
        monthInNumbers.push('09')
    }else if (month === "October"){
        monthInNumbers.push('10')
    }else if (month === "November"){
        monthInNumbers.push('11')
    }else if (month === "December"){
        monthInNumbers.push('12')
    }

    let filteredTransactions = 0
    for (let i=0; i < trans.length; i++){

        let dateAddedSplitted = (trans[i].date_added).split('-')
        let dateAdded = dateAddedSplitted[1]
        let yearAdded = dateAddedSplitted[0]
        
        if (monthInNumbers[0] === dateAdded && year === yearAdded){
            if (trans[i].hasOwnProperty('expense')){
                filteredTransactions -= trans[i].expense
            }else if (trans[i].hasOwnProperty('income')){
                filteredTransactions += trans[i].income
            }
        }
    }
    return filteredTransactions
}


export const getFilteredTransArr = (trans, month, year) => {
    let monthInNumbers = []
    
    if (month === "January"){
        monthInNumbers.push('01')
    }else if (month === "February"){
        monthInNumbers.push('02')
    }else if (month === "March"){
        monthInNumbers.push('03')
    }else if (month === "April"){
        monthInNumbers.push('04')
    }else if (month === "May"){
        monthInNumbers.push('05')
    }else if (month === "June"){
        monthInNumbers.push('06')
    }else if (month === "July"){
        monthInNumbers.push('07')
    }else if (month === "August"){
        monthInNumbers.push('08')
    }else if (month === "September"){
        monthInNumbers.push('09')
    }else if (month === "October"){
        monthInNumbers.push('10')
    }else if (month === "November"){
        monthInNumbers.push('11')
    }else if (month === "December"){
        monthInNumbers.push('12')
    }

    let filteredTransactions = []
    for (let i=0; i < trans.length; i++){

        let dateAddedSplitted = (trans[i].date_added).split('-')
        let dateAdded = dateAddedSplitted[1]
        let yearAdded = dateAddedSplitted[0]
        
        if (monthInNumbers[0] === dateAdded && year === yearAdded){
            filteredTransactions.push(trans[i])
        }
    }
    return filteredTransactions
}

export const getSortByNameAscending = (trans) => {
    trans.sort((a, b) => a.category.localeCompare(b.category))
    return trans
}

export const getSortByNameDescending = (trans) => {
    trans.sort((a, b) => b.category.localeCompare(a.category))
    return trans
}

export const getSortByDateAscending = (trans) => {
    trans.sort((a, b) => (a.date_added > b.date_added) ? 1 : -1)
    return trans
}

export const getSortByDateDescending = (trans) => {
    trans.sort((a, b) => (a.date_added > b.date_added) ? -1 : 1) 
    return trans
}