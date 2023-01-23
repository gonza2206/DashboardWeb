import React, { useState, useContext } from "react";

export const dateToggleContext = React.createContext();

// export function useDateContext() {
//     return useContext(dateContext);
// }


export function DateProvider(props) {

    const actualDate = new Date();
    let year = actualDate.getFullYear();
    let month = actualDate.getMonth();
    let initialDefaulTime = `${year}-${month}-3`;
    let finalDefaulTime = `${year}-${month}-4`;
    let defaultMonth = 0;
    if (month === 2) {//si estamos en febrero
        let finalDefaulTime = `${year}-${month}-28`;
    }
    else {
        let finalDefaulTime = `${year}-${month}-30`;
    }


    const [date, setDate] = useState({
        startDate: initialDefaulTime,
        endDate: finalDefaulTime,
        month: defaultMonth
    });

    const updateDate = (newDate, lastDate, Month) => {
        if(Month===undefined)
        {
            Month = 0;
        }
        setDate((currentDate) => ({
            ...currentDate,
            startDate: newDate,
            endDate: lastDate,
            month: Month,
        }));
        console.log(date);
    };

    return (

        <dateToggleContext.Provider value={{ date, updateDate }}>
            {props.children}
        </dateToggleContext.Provider>
    );
}