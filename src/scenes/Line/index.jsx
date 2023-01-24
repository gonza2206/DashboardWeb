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

const Line = () => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { date, values } = useContext(dateToggleContext);

  const [info, setInfo] = useState(
    [
      {
        x: '2023-1-1-0-0-0',
        y: 0,
      },
    ]
  );
  const [noData, setNoData] = useState(false);
  const [month, setMonth] = useState(0);

  const parseFrame = (frame) => {
    let frameArray = frame.split(',');
    let tension = frameArray[2];
    console.log(`values ${values.maxValue}`);
    
    return (tension);

  }

  useEffect(() => {
    getData(month);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [month]);

  const getData = (monthData) => {
    setMonth(monthData);
    let data = [];
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
  }

  const style = {
    backgroundColor: colors.blueAccent[700],
    color: colors.grey[100],
    fontSize: "14px",
    fontWeight: "bold",
    padding: "10px 20px 10px ",
    margin: "2px"
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
        <Box display={"flex"}  justifyContent={"center"} marginTop={"10px"}>
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
        {noData === true ? <NoData /> : <LineChart isDashboard={false} data={info} />}
      </Box>
    </Box>
  );
};

export default Line;
