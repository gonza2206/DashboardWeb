import React, { useState } from "react";

export const dateToggleContext = React.createContext();


export function DateProvider(props) {

    const actualDate = new Date();
    let year = actualDate.getFullYear();
    let month = actualDate.getMonth();
    let initialDefaulTime = `${year}-${month}-3`;
    let finalDefaulTime = `${year}-${month}-4`;
    let defaultMonth = 0;
    if (month === 2) {//si estamos en febrero
        finalDefaulTime = `${year}-${month}-28`;
    }
    else {
        finalDefaulTime = `${year}-${month}-30`;
    }

    const [values, setValues] = useState({
        maxValue: 0,
        averageValue: 0,
    });

    const [date, setDate] = useState({
        startDate: initialDefaulTime,
        endDate: finalDefaulTime,
        month: defaultMonth
    });

    const updateValue = (max, average) => {
        setValues((currentValue) => ({
            ...currentValue,
            maxValue: max,
            averageValue: average,
        }))
       console.log("valusfghss",values);
    }

    const updateDate = (newDate, lastDate, Month) => {
        if (Month === undefined) {
            Month = 0;
        }
        setDate((currentDate) => ({
            ...currentDate,
            startDate: newDate,
            endDate: lastDate,
            month: Month,
        }));
        //console.log(date);
    };

    return (

        <dateToggleContext.Provider value={{ date, values,  updateDate, updateValue }}>
            {props.children}
        </dateToggleContext.Provider>
    );
}