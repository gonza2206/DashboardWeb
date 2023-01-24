
import React from 'react'
import Header from '../../components/Header'
import { useEffect } from "react";
import { useState, useContext } from "react";
import { dateToggleContext } from "../../provider/DateContext";

import { Box, Button, ButtonGroup, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData";
import NoData from '../../components/NoData';
import TextInput from '../../components/TextInput';

import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import ElectricalServicesIcon from '@mui/icons-material/ElectricalServices';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import LineChart from "../../components/LineChart";
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import BarChart from "../../components/BarChart";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";

import { getDateFromApi } from '../../services/axiosService';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

function Dashboard() {

  const { date, updateValue } = useContext(dateToggleContext);
  const [info, setInfo] = useState(
    [
      {
        x: '2023-1-1-0-0-0',
        y: 0,
      },
    ]
  );
  const [power, setPower] = useState(
    [
      {
        x: '2023-1-1-0-0-0',
        y: 0,
      },
    ]
  );
  const [peak, setPeak] = useState(
    [
      {
        x: '2023-1-1-0-0-0',
        y: 0,
      },
    ]
  );
  const [noData, setNoData] = useState(false);
  const [state, setState] = useState(false);
  const [maxValue, setMaxValue] = useState();
  const [averageValue, setAverageValue] = useState();
  const [frame, setFrame] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const [isSelected, setIsSelected] = useState({
    current:true,
    peak:true,
    power:true,
  });


  const reRender = () => {
    setState(!state);
  }

  const parseFrame = (frame, option) => {
    //Fase[°],Vrms[V],Irms[A],Ipk[A],Imax[A],Ih1[A],Ih2[A],Ih3[A],Ih4[A],Ih5[A],Ih6[A],Ih7[A],Ithd[%],Pa[kW],E[kWh]
    let response = 0;
    let frameArray;
    frameArray = frame.split(',');
    if (option === "LineData") {
      response = frameArray[2];
      return (response);
    }
    if (option === "power") {
      response = frameArray[13];
      return (response);
    }
    if (option === "peak") {
      response = frameArray[3];
      return (response);
    }
    return (response);
  }

  useEffect(() => {
    let data = [];
    let powerData = [];
    let peakData = [];

    getDateFromApi(date)
      .then(
        (response) => {
          //console.log(response.data);
          if (response.status === 200) {

            if (response.data.meassure.length === 0) {
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
              setAverageValue(response.data.average);
              setMaxValue(response.data.max);
              setFrame(response.data.harmonics);
              updateValue(response.data.max, response.data.average)
              let tempResponse = response.data.meassure;

              tempResponse.forEach(element => {
                //Current Data
                const DataObj = {
                  x: element.date,
                  y: parseFrame(element.meassure, "LineData")
                }
                data.push(DataObj);
                //Power data
                const PowerObj = {
                  x: element.date,
                  y: parseFrame(element.meassure, "power")
                }
                powerData.push(PowerObj);
                //Peak Data
                const PeakObj = {
                  x: element.date,
                  y: parseFrame(element.meassure, "peak")
                }
                peakData.push(PeakObj)
              });
              setInfo(data);
              setPower(powerData);
              setPeak(peakData);
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

  function PowerhandleChange(event) {
    if (!event.target.checked) {
      setIsSelected((currentValue) => ({
        ...currentValue,
        power: false,
    }));
  
    }
    else{
      setIsSelected((currentValue) => ({
        ...currentValue,
        power: true,
    }));

    }
  }
  
  
  function CurrenthandlerChange(event) {
    if (!event.target.checked) {
      setIsSelected((currentValue) => ({
        ...currentValue,
        current: false,
    }));
    
    }
    else {
      setIsSelected((currentValue) => ({
        ...currentValue,
        current: true,
    }));
    }
  }


  function PeakhandlerChange(event) {
    if (!event.target.checked) {
      setIsSelected((currentValue) => ({
        ...currentValue,
        peak: false,
    }));
  
    }
    else {
      setIsSelected((currentValue) => ({
        ...currentValue,
        peak: true,
    }));
  
    }
  }




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
          {noData === true ? <NoData inBox={true} /> : <StatBox
            title="THD [%]"
            subtitle={parseFloat(frame[7]).toFixed(2)}
            progress={parseFloat(frame[7]).toFixed(2) / 100}
            icon={
              <ElectricBoltIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />}
        </Box>
        {/*Box 2*/}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {noData === true ? <NoData inBox={true} /> : <StatBox
            title="E [kwh]"
            subtitle={parseFloat(frame[8]).toFixed(2)}
            progress={parseFloat(frame[7]).toFixed(2) / 10}
            icon={
              <EmojiObjectsIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />}
        </Box>
        {/*Box 3*/}
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          {noData === true ? <NoData inBox={true} /> : <StatBox
            title="Cos phi"
            subtitle="0.98"
            progress="0.98"
            icon={
              <ElectricalServicesIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />}
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
              <FormControlLabel control={<Checkbox defaultChecked onChange={PeakhandlerChange} />} label="Peak" />
              <FormControlLabel control={<Checkbox defaultChecked onChange={CurrenthandlerChange} />} label="Current" />
              <FormControlLabel control={<Checkbox defaultChecked onChange={PowerhandleChange} />} label="Power" />
            </Box>
          </Box>

          {/*LineChart */}
          {
            noData === true ? <NoData /> :
              <Box height="250px" m="-30px 0 0 0">
                {noData === true ? <NoData /> : <LineChart isDashboard={true} data={info} powerData={power} peakData={peak} selected={isSelected}/>}
                <Box display={"flex"} sx={{ marginTop: "-60px" }} justifyContent={"center"}>
                  <Typography
                    alignSelf={"center"}
                    variant="h5"
                    fontWeight="300"
                    color={colors.grey[100]}

                  >
                    Peak Current :
                  </Typography>
                  <Typography variant="h5" marginLeft={"10px"} fontWeight="300" color={colors.greenAccent[400]}> {maxValue} </Typography>
                  <Typography
                    marginLeft={"40px"}
                    variant="h5"
                    fontWeight="300"
                    color={colors.grey[100]}
                  >
                    Average power:
                  </Typography>
                  <Typography variant="h5" marginLeft={"10px"} fontWeight="300" color={colors.greenAccent[400]}> {parseFloat(averageValue).toFixed(2)} </Typography>
                </Box>
              </Box>
          }

        </Box>

        {/*Event Summary */}
        {noData === true ?
          <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
          >
            <NoData inBox={true} />
          </Box> :
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
                  backgroundColor={colors.redAccent[500]}
                  p="5px 10px"
                  borderRadius="4px"
                >
                  {transaction.cost}
                </Box>
              </Box>
            ))}
          </Box>}

        {/* ROW 3 */}
        {noData === true ? <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <NoData inBox={true} />
        </Box> :
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
          </Box>}
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
            {noData === true ? <NoData /> : <BarChart isDashboard={true} frame={frame} />}
          </Box>
        </Box>

      </Box>
    </Box>

  )
}

export default Dashboard