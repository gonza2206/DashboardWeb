import React, { useEffect } from 'react';
import Header from "../../components/Header";
import BarChart from '../../components/BarChart';
import { useState, useContext } from "react";
import { dateToggleContext } from "../../provider/DateContext";

import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import NoData from '../../components/NoData';
import TextInput from '../../components/TextInput';
import { getDateFromApi } from '../../services/axiosService';


const Bar = () => {

  const theme = useTheme();
  const { date, floor } = useContext(dateToggleContext);
  const [noData, setNoData] = useState(false);
  
  const [frame, setFrame] = useState();


useEffect(() => {
  getData();
}, []);

const getData = ()=>{

    getDateFromApi(date, 0, floor.id)
      .then(
        (response) => {
          //console.log(response.data);
          if (response.status === 200) {

            if (response.data.meassure.length === 0) {
              setNoData(true);
            }
            else {
              setNoData(false);
              setFrame(response.data.harmonics);
            }
          }
        }
      ).catch(
        (error => alert(`An error has ocurred ${error}`))
      );
}



  return (
        <Box m="20px">
        <Header title="Bar Chart" subtitle="Simple Bar Chart" />
        <Box height="75vh">
        <BarChart isDashboard={false} frame={frame} />
        </Box>
      </Box>
    );
}

export default Bar;
