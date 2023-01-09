import React, { useState, useContext } from "react";

export const dateToggleContext = React.createContext();

// export function useDateContext() {
//     return useContext(dateContext);
// }


export function DateProvider(props) {

    const actualDate = new Date();
    let year = actualDate.getFullYear();
    let month = actualDate.getMonth();
    let initialDefaulTime = `${year}-${month}-01`;
    let finalDefaulTime = `${year}-${month}-28`;
    if (month === 2) {//si estamos en febrero
        let finalDefaulTime = `${year}-${month}-28`;
    }
    else {
        let finalDefaulTime = `${year}-${month}-30`;
    }


    const [date, setDate] = useState({
        startDate: initialDefaulTime,
        endDate: finalDefaulTime,
    });

    const updateDate = (newDate, lastDate) => {
        setDate((currentDate) => ({
            ...currentDate,
            startDate: newDate,
            endDate: lastDate
        }));
        console.log(date);
    };

    return (

        <dateToggleContext.Provider value={{ date, updateDate }}>
            {props.children}
        </dateToggleContext.Provider>
    );
}