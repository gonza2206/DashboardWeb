import { Box, Button, ButtonGroup, Typography } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import React from 'react'
import { useEffect } from "react";
import { useState, useContext } from "react";
import { dateToggleContext } from "../../provider/DateContext";
import { tokens } from "../../theme";
import { getDateFromApi } from '../../services/axiosService';
import NoData from '../../components/NoData';
import { useTheme } from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
const Line = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { date, values } = useContext(dateToggleContext);
  const [isSelected, setIsSelected] = useState({
    current: true,
    peak: true,
    power: true,
  });
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
  const [month, setMonth] = useState(0);

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
    getData(month);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  const getData = (monthData) => {
    setMonth(monthData);
    let data = [];
    let powerData = [];
    let peakData = [];
    getDateFromApi(date)
      .then(
        (response) => {
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
              setInfo(data)
              setPower(powerData);
              setPeak(peakData);
            }
          }
        }
      ).catch(
        (error => alert(`An error has ocurred ${error}`))
      );
  }

  const style = {
    backgroundColor: colors.blueAccent[700],
    color: colors.grey[100],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px 10px ",
    margin: "2px"
  }

  function PowerhandleChange(event) {
    if (!event.target.checked) {
      setIsSelected((currentValue) => ({
        ...currentValue,
        power: false,
      }));

    }
    else {
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
      <Header title="Line Chart" subtitle="Simple Line Chart" />
      <Box mt="10px" ml={'20px'}>
        <ButtonGroup variant="contained" padding="10px">

          <Button onClick={() => setMonth(1)} sx={style} >
            January
          </Button>

          <Button sx={style} onClick={() => setMonth(2)}>
            February
          </Button>

          <Button sx={style}>
            March
          </Button>

          <Button sx={style}>
            April
          </Button>

          <Button sx={style}>
            May
          </Button>

          <Button sx={style}>
            June
          </Button>

          <Button sx={style}>
            July
          </Button>

          <Button sx={style}>
            August
          </Button>

          <Button sx={style}>
            September
          </Button>

          <Button sx={style}>
            October
          </Button>

          <Button sx={style}>
            November
          </Button>

          <Button sx={style}>
            December
          </Button>
        </ButtonGroup>
        <Box display={"flex"} justifyContent={"center"} marginTop={"10px"}>
          <Typography
            alignSelf={"center"}
            variant="h4"
            fontWeight="300"
            color={colors.grey[100]}

          >
            Peak Current :
          </Typography>
          <Typography variant="h4" marginLeft={"10px"} fontWeight="300" color={colors.greenAccent[400]}> {values.maxValue} </Typography>
          <Typography
            marginLeft={"40px"}
            variant="h4"
            fontWeight="300"
            color={colors.grey[100]}
          >
            Average power:
          </Typography>
          <Typography variant="h4" marginLeft={"10px"} fontWeight="300" color={colors.greenAccent[400]}> {parseFloat(values.averageValue).toFixed(2)} </Typography>
        </Box>
      </Box>
      <Box height="65vh">
        {noData === true ? <NoData /> : <LineChart isDashboard={false} data={info} powerData={power} peakData={peak} selected={isSelected} />}
      </Box>
    </Box>
  );
};

export default Line;
