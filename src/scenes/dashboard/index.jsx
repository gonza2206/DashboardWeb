
import React from 'react'
import Header from '../../components/Header'
import { useEffect } from "react";
import { useState, useContext } from "react";
import { dateToggleContext } from "../../provider/DateContext";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import NoData from '../../components/NoData';
import TextInput from '../../components/TextInput';

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import TrafficIcon from "@mui/icons-material/Traffic";
import LineChart from "../../components/LineChart";
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";

import { getDateFromApi } from '../../services/axiosService';

function Dashboard() {

  const { date } = useContext(dateToggleContext);

  const [info, setInfo] = useState(
    [
      {
        x: '2023-1-1-0-0-0',
        y: 0,
      },
    ]
  );
  const [noData, setNoData] = useState(false);
  const [state, setState] = useState(false);

  const reRender = () => {
    setState(!state);
  }

  const parseFrame = (frame) => {
    //Fase[°],Vrms[V],Irms[A],Ipk[A],Imax[A],Ih1[A],Ih2[A],Ih3[A],Ih4[A],Ih5[A],Ih6[A],Ih7[A],Ithd[%],Pa[kW],E[kWh]
    let frameArray = frame.split(',');
    let tension = frameArray[1];
    let current = frameArray[2];
    let maxCurrent = frameArray[4];
    let h1 = frameArray[5];
    let h2 = frameArray[6];
    let h3 = frameArray[7];
    let h4 = frameArray[8];
    let h5 = frameArray[9];
    let h6 = frameArray[10];
    let h7 = frameArray[11];

    return (tension);
  }

  useEffect(() => {
    let data = [];

    getDateFromApi(date)
      .then(
        (response) => {
          if (response.status === 200) {

            if (response.data.length === 0) {
              setNoData(true);
              setInfo(
                [
                  {
                    x: '2023-1-1-0-0-0',
                    y: 0,
                  },
                ]
              )
            }
            else {
              setNoData(false);
              let tempResponse = response.data;
              tempResponse.forEach(element => {
                const DataObj = {
                  x: element.date,
                  y: parseFrame(element.meassure)
                }
                data.push(DataObj);
              });
              setInfo(data)
            }
          }
        }
      ).catch(
        (error => alert(`An error has ocurred ${error}`))
      );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);



  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />

        <Box>
          <Button
            sx={{
              backgroundColor: colors.blueAccent[700],
              color: colors.grey[100],
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlinedIcon sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </Box>

      {/* GRID & CHARTS */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <TextInput title={"Set Dates"} state={reRender}></TextInput>
        </Box>
        {/*Box 1*/}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="431,225"
            subtitle="Sales Obtained"
            progress="0.50"
            increase="+21%"
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/*Box 2*/}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="32,441"
            subtitle="New Clients"
            progress="0.30"
            increase="+5%"
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        {/*Box 3*/}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title="1,325,134"
            subtitle="Traffic Received"
            progress="0.80"
            increase="+43%"
            icon={
              <TrafficIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            {/*LineChart tittle */}
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Measurements
              </Typography>
              {noData !== true && <Typography
                variant="h3"
                fontWeight="bold"
                color={colors.greenAccent[500]}
              >
                Consumption 380 kw/h
              </Typography>}
            </Box>
          </Box>

          {/*LineChart */}
          <Box height="250px" m="-20px 0 0 0">
            {noData === true ? <NoData /> : <LineChart isDashboard={true} data={info}/>}
          </Box>
        </Box>

        {/*Event Summary */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            borderBottom={`4px solid ${colors.primary[500]}`}
            colors={colors.grey[100]}
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Event Summary
            </Typography>
          </Box>
          {/*Informacion de los eventos (traer de la base de datos) */}
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Box>
                <Typography
                  color={colors.greenAccent[500]}
                  variant="h5"
                  fontWeight="600"
                >
                  {transaction.txId}
                </Typography>
                <Typography color={colors.grey[100]}>
                  {transaction.user}
                </Typography>
              </Box>
              <Box color={colors.grey[100]}>{transaction.date}</Box>
              <Box
                backgroundColor={colors.greenAccent[500]}
                p="5px 10px"
                borderRadius="4px"
              >
                ${transaction.cost}
              </Box>
            </Box>
          ))}
        </Box>

        {/* ROW 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Consumption
          </Typography>
          {/*Barra circular de progreso */}
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" />
            <Typography
              variant="h5"
              color={colors.greenAccent[500]}
              sx={{ mt: "15px" }}
            >
              280 kw Save!
            </Typography>
            <Typography>Includes extra misc expenditures and costs</Typography>
          </Box>
        </Box>
        {/*BarChar harmonics */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Harmonics
          </Typography>
          {/*Graph */}
          <Box height="250px" mt="-20px">
            <BarChart isDashboard={true} />
          </Box>
        </Box>


      </Box>
    </Box>

  )
}

export default Dashboard