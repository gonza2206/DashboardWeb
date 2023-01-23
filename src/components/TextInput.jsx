import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import React, { useState , useContext } from 'react';
import { tokens } from "../theme";
import { dateToggleContext } from "../provider/DateContext";

const TextInput = ({ title, state }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [startDay, setStartDay] = useState("");
    const [endDay, setEndDay] = useState("");
    const { updateDate } = useContext(dateToggleContext);

    const handleChange = (e) => {
        setStartDay(e.target.value);
    }

    const handleChange2 = (e) => {
        setEndDay(e.target.value);
    }

    const Submit = async () => {
        if (validateDay(startDay) && validateDay(endDay)) {       
            updateDate(startDay,endDay,0) //Modifico las fechas en el contexto por lo que renderiza a los componentes que lo utilicen. 
            state();
        }
    }

    const validateDay = (dateToValidate) => {

        const array = dateToValidate.split("-");

        for (let index = 0; index < array.length; index++) {
            const element = array[index];
            let status = isNaN(element)
            if (status === true) {
                alert("Please enter a valid date");
                return (false);
            }
        }

        let aux = parseInt(array[0], 10)
        if (array[0].length !== 4 || array[1].length < 1 || array[2].length < 1 || array[1].length > 2 || array[2].length > 2 || aux > 2100 || aux < 2000 || array[1] > 12 || array[2] > 31) {

            alert("Please enter a valid date");
            return (false)
        }
        if (array[1] === '2' && array[2] > '29') {

            alert("Please enter a valid date");
            return (false)
        }
        return (true);
    }

    return (
        <Box width="100%" m="0 10px">
            <Box display="flex" justifyContent="space-between" mt="1px">
                <Typography variant="h4" sx={{ color: colors.greenAccent[500] }}>
                    {title}
                </Typography>

                <Button
                    sx={{
                        backgroundColor: colors.blueAccent[700],
                        color: colors.grey[100],
                        fontWeight: "bold",
                    }}
                    onClick={Submit}
                >
                    Submit
                </Button>
            </Box>

            <Box display="flex" justifyContent="space-between" mt="1px">
                <TextField
                    label="Start Date: 2023-1-17"
                    variant="standard"
                    size="small"
                    value={startDay}
                    onChange={handleChange}
                />
            </Box>
            <Box display="flex" justifyContent="space-between" mt="3px">
                <TextField
                    label="End Date: 2023-1-19"
                    variant="standard"
                    size="small"
                    value={endDay}
                    onChange={handleChange2}

                />
            </Box>


        </Box>
    );
}

export default TextInput;
