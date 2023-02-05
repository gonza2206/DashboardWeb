import React, { useState } from "react";

export const dateToggleContext = React.createContext();


export function DateProvider(props) {

    const actualDate = new Date();
    let year = actualDate.getFullYear();
    let month = actualDate.getMonth();
    let day = actualDate.getDate();
    let initialDefaulTime = `${year}-${month}-1`;
    let finalDefaulTime = `${year}-${month}-${day}`;
    let defaultMonth = 0;


    const [values, setValues] = useState({
        maxValue: 0,
        averageValue: 0,
    });

    const [date, setDate] = useState({
        startDate: initialDefaulTime,
        endDate: finalDefaulTime,
        month: defaultMonth
    });

    const [floor, setFloor] = useState({
        id: 1
    });

    const [maxConsumption, setMaxConsumption] = useState(500);

    const updateFloorValue = (newID) => {
        setFloor((currentValue) => ({
            ...currentValue,
            id: newID,
        }))
    }
    const updateMaxConsuption = (max) => {
        setMaxConsumption((max))
    }

    const updateValue = (max, average) => {
        setValues((currentValue) => ({
            ...currentValue,
            maxValue: max,
            averageValue: average,
        }))
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
    };

    return (

        <dateToggleContext.Provider value={{ date, values, floor, maxConsumption, updateDate, updateValue, updateFloorValue, updateMaxConsuption }}>
            {props.children}
        </dateToggleContext.Provider>
    );
}
