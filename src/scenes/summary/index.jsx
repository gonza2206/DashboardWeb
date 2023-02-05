
import React from 'react'
import Header from '../../components/Header'
import { useEffect } from "react";
import { useState, useContext } from "react";
import { dateToggleContext } from "../../provider/DateContext";

import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
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
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Summary = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { date, updateMaxConsuption } = useContext(dateToggleContext);
    const [noData, setNoData] = useState(false);
    const [topConsuption, setTopConsuption] = useState(0);
    const [maxValue, setMaxValue] = useState();
    const [averageValue, setAverageValue] = useState();
    const [frame, setFrame] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
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

    const [maxValue2, setMaxValue2] = useState();
    const [averageValue2, setAverageValue2] = useState();
    const [frame2, setFrame2] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
    const [info2, setInfo2] = useState(
        [
            {
                x: '2023-1-1-0-0-0',
                y: 0,
            },
        ]
    );
    const [power2, setPower2] = useState(
        [
            {
                x: '2023-1-1-0-0-0',
                y: 0,
            },
        ]
    );
    const [peak2, setPeak2] = useState(
        [
            {
                x: '2023-1-1-0-0-0',
                y: 0,
            },
        ]
    );
    const [power2Status, setPower2Status] = useState(true);
    const [peakCurrent, setPeakCurrent] = useState(0);


    //Check Handlers
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
        getData();
        getDataSecondFloor();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const getData = () => {
        let data = [];
        let powerData = [];
        let peakData = [];

        getDateFromApi(date, 0, "1")
            .then(
                (response) => {
                    console.log(response);
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
    }

    const getDataSecondFloor = () => {
        let data = [];
        let powerData = [];
        let peakData = [];

        getDateFromApi(date, 0, "2")
            .then(
                (response) => {
                    console.log(response);
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
                            setAverageValue2(response.data.average);
                            setMaxValue2(response.data.max);
                            setFrame2(response.data.harmonics);
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
                            setInfo2(data);
                            setPower2(powerData);
                            setPeak2(peakData);
                        }
                    }
                }
            ).catch(
                (error => alert(`An error has ocurred ${error}`))
            );
    }

    const handleSubmit = () => {

        if (isNaN(topConsuption) || topConsuption <= 0) {
            alert('Please enter a valid number greater than 0.');
            return
        }
        else {
            updateMaxConsuption(topConsuption);
            console.log('Top Consuption:', topConsuption);
        }
    };

    const handlePeakSubmit = () => {
        if (isNaN(peakCurrent) || peakCurrent <= 0) {
            alert('Please enter a valid number greater than 0.');
            return;
        }
    }
        return (
            <Box m="20px">
                {/* HEADER */}
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Header title="Summary" subtitle="Extended meassure information" />

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
                        gridColumn="span 12"
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


                                {noData !== true && <Typography
                                    variant="h3"
                                    fontWeight="bold"
                                    color={colors.greenAccent[500]}
                                >
                                    Measurements


                                </Typography>}
                                <FormControlLabel control={<Checkbox defaultChecked onChange={PeakhandlerChange} />} label="Piso 4 [kwh]" />
                                <FormControlLabel control={<Checkbox defaultChecked onChange={PowerhandleChange} />} label="Piso 2 [kwh]" />
                            </Box>
                        </Box>

                        {/*LineChart */}
                        {
                            noData === true ? <NoData /> :
                                <Box height="250px" m="-30px 0 0 0">
                                    {noData === true ? <NoData /> : <LineChart isDashboard={false} data={info} powerData={power} peakData={power2} selected={isSelected} isSummary={power2Status} />}
                                </Box>
                        }

                    </Box>
                    {/*ROW 2 */}
                    <Box
                        gridColumn="span 12"
                        gridRow="span 3"
                        backgroundColor={colors.primary[400]}
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
                                Meassures
                            </Typography>

                        </Box>
                        {/*Piso 4 */}
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid ${colors.primary[500]}`}
                            colors={colors.grey[100]}
                            p="15px"
                        >
                            <Typography
                                alignSelf={"center"}
                                variant="h5"
                                fontWeight="300"
                                color={colors.greenAccent[500]}

                            >
                                Piso 2
                            </Typography>

                            <Typography
                                alignSelf={"center"}
                                variant="h5"
                                fontWeight="300"
                                color={colors.grey[100]}

                            >
                                Ekwh:
                            </Typography>
                            <Typography variant="h5" marginLeft={"-20px"} fontWeight="300" color={colors.greenAccent[400]}> {isNaN(parseFloat(frame[8]).toFixed(2)) === false ? parseFloat(frame[8]).toFixed(2) : '0.00'} </Typography>

                            <Typography
                                alignSelf={"center"}
                                variant="h5"
                                fontWeight="300"
                                color={colors.grey[100]}

                            >
                                THD:
                            </Typography>
                            <Typography variant="h5" marginLeft={"-20px"} fontWeight="300" color={colors.greenAccent[400]}> {isNaN(parseFloat(frame2[7]).toFixed(2)) === false ? parseFloat(frame2[7]).toFixed(2) : '0.00'} </Typography>

                            <Typography
                                alignSelf={"center"}
                                variant="h5"
                                fontWeight="300"
                                color={colors.grey[100]}

                            >
                                Reactive Power:
                            </Typography>
                            <Typography variant="h5" marginLeft={"-20px"} fontWeight="300" color={colors.greenAccent[400]}> {isNaN(parseFloat(frame[11]).toFixed(2)) === false ? parseFloat(frame[11]).toFixed(2) : '0.00'} </Typography>


                            <Typography
                                alignSelf={"center"}
                                variant="h5"
                                fontWeight="300"
                                color={colors.grey[100]}

                            >
                                Peak Current :
                            </Typography>
                            <Typography variant="h5" marginLeft={"-20px"} fontWeight="300" color={colors.greenAccent[400]}> {maxValue === undefined ? '0.00' : maxValue} </Typography>
                            <Typography
                                variant="h5"
                                fontWeight="300"
                                color={colors.grey[100]}
                            >
                                Average power:
                            </Typography>
                            <Typography variant="h5" marginLeft={"-20px"} fontWeight="300" color={colors.greenAccent[400]}> {isNaN(parseFloat(averageValue).toFixed(2)) === false ? parseFloat(averageValue).toFixed(2) : '0.00'} </Typography>

                            <Typography
                                alignSelf={"center"}
                                variant="h5"
                                fontWeight="300"
                                color={colors.grey[100]}

                            >
                                Cos φ:
                            </Typography>
                            <Typography variant="h5" marginLeft={"-20px"} fontWeight="300" color={colors.greenAccent[400]}> {isNaN(parseFloat(frame[10]).toFixed(2)) === false ? parseFloat(frame[10]).toFixed(2) : '0.00'} </Typography>

                        </Box>

                        {/*Piso 2 */}
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid ${colors.primary[500]}`}
                            colors={colors.grey[100]}
                            p="15px"
                        >
                            <Typography
                                alignSelf={"center"}
                                variant="h5"
                                fontWeight="300"
                                color={colors.greenAccent[500]}

                            >
                                Piso 4
                            </Typography>

                            <Typography
                                alignSelf={"center"}
                                variant="h5"
                                fontWeight="300"
                                color={colors.grey[100]}

                            >
                                Ekwh:
                            </Typography>
                            <Typography variant="h5" marginLeft={"-20px"} fontWeight="300" color={colors.greenAccent[400]}> {isNaN(parseFloat(frame2[8]).toFixed(2)) === false ? parseFloat(frame2[8]).toFixed(2) : '0.00'} </Typography>

                            <Typography
                                alignSelf={"center"}
                                variant="h5"
                                fontWeight="300"
                                color={colors.grey[100]}

                            >
                                THD:
                            </Typography>
                            <Typography variant="h5" marginLeft={"-20px"} fontWeight="300" color={colors.greenAccent[400]}> {isNaN(parseFloat(frame2[7]).toFixed(2)) === false ? parseFloat(frame2[7]).toFixed(2) : '0.00'} </Typography>

                            <Typography
                                alignSelf={"center"}
                                variant="h5"
                                fontWeight="300"
                                color={colors.grey[100]}

                            >
                                Reactive Power:
                            </Typography>
                            <Typography variant="h5" marginLeft={"-20px"} fontWeight="300" color={colors.greenAccent[400]}> {isNaN(parseFloat(frame2[11]).toFixed(2)) === false ? parseFloat(frame2[11]).toFixed(2) : '0.00'} </Typography>


                            <Typography
                                alignSelf={"center"}
                                variant="h5"
                                fontWeight="300"
                                color={colors.grey[100]}

                            >
                                Peak Current :
                            </Typography>
                            <Typography variant="h5" marginLeft={"-20px"} fontWeight="300" color={colors.greenAccent[400]}> {maxValue2 === undefined ? '0.00' : maxValue2} </Typography>
                            <Typography
                                variant="h5"
                                fontWeight="300"
                                color={colors.grey[100]}
                            >
                                Average power:
                            </Typography>
                            <Typography variant="h5" marginLeft={"-20px"} fontWeight="300" color={colors.greenAccent[400]}> {isNaN(parseFloat(averageValue2).toFixed(2)) === false ? parseFloat(averageValue2).toFixed(2) : '0.00'} </Typography>

                            <Typography
                                alignSelf={"center"}
                                variant="h5"
                                fontWeight="300"
                                color={colors.grey[100]}

                            >
                                Cos φ:
                            </Typography>
                            <Typography variant="h5" marginLeft={"-20px"} fontWeight="300" color={colors.greenAccent[400]}> {isNaN(parseFloat(frame2[10]).toFixed(2)) === false ? parseFloat(frame2[10]).toFixed(2) : '0.00'} </Typography>

                        </Box>

                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid ${colors.primary[500]}`}
                            colors={colors.grey[100]}
                            p="15px"
                        >
                            <Typography
                                alignSelf={"center"}
                                variant="h5"
                                fontWeight="300"
                                color={colors.grey[100]}
                            >
                                Top Consuption:
                            </Typography>
                            <TextField
                                label="Enter Value"
                                variant="outlined"
                                margin="dense"
                                value={topConsuption}
                                size="small"
                                onChange={event => setTopConsuption(event.target.value)}
                                InputProps={{
                                    style: {
                                        borderColor: 'white',

                                    },
                                }}
                            />
                            <Button variant="contained" color="primary" onClick={handleSubmit}>
                                Submit
                            </Button>
                        </Box>
                        <Box
                            display="flex"
                            justifyContent="space-between"
                            alignItems="center"
                            borderBottom={`4px solid ${colors.primary[500]}`}
                            colors={colors.grey[100]}
                            p="15px"
                        >
                            <Typography
                                alignSelf={"center"}
                                variant="h5"
                                fontWeight="300"
                                color={colors.grey[100]}
                            >
                                Peak Current:
                            </Typography>
                            <TextField
                                label="Enter Value"
                                variant="outlined"
                                margin="dense"
                                size="small"
                                value={peakCurrent}
                                onChange={event => setPeakCurrent(event.target.value)}
                                InputProps={{
                                    style: {
                                        borderColor: 'white',
                                    },
                                }}
                            />
                            <Button variant="contained" color="primary" onClick={handlePeakSubmit}>
                                Submit
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        );
    }

    export default Summary;
