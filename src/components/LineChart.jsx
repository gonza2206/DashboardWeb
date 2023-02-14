import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";
import { tokens } from "../theme";
import { useEffect } from "react";

const LineChart = ({ isDashboard, data, refresh, powerData, peakData, selected, isSummary = false }) => {

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  let power = {
    id: isSummary === true ? "Consumo Piso 2" : "Power",
    color: tokens("dark").blueAccent[500],
    data: powerData
  }
  let current = {
    id: "Current",
    color: tokens("dark").greenAccent[500],
    data: data
  }
  let peak = {
    id: isSummary === true ? "Consumo Piso 4" : "Peak Current",
    color: tokens("dark").redAccent[500],
    data: peakData
  }

  const setData = () => {
    let LineChartData = [power, peak, current]

    if (isDashboard === false && isSummary===false) {

      return (LineChartData)
    }

    if (selected.current === false) {
      LineChartData = [power, peak]
    }
    if (selected.peak === false) {
      LineChartData = [power, current]
    }
    if (selected.power === false) {
      LineChartData = [peak, current]
    }


    if (selected.current === false && selected.peak === false) {
      LineChartData = [power]
    }
    if (selected.current === false && selected.power === false) {
      LineChartData = [peak]
    }
    if (selected.peak === false && selected.power === false && isSummary === false) {
      LineChartData = [current]
    }
    if (selected.peak === false && selected.power === false && selected.current === false) {
      LineChartData = []
    }

    if (isSummary === true) {
      if (selected.peak === false && selected.power === true) {
        LineChartData = [power]
      }
      if (selected.power === false && selected.peak === true) {
        LineChartData = [peak]
      }
      if (selected.peak === false && selected.power === false )
      {
        LineChartData = []
      }
      if(selected.peak === true && selected.power === true ){
        LineChartData = [power, peak]
      }
    }

    return (LineChartData)
  }

  useEffect(() => {

  }, [refresh, selected]);

  return (
    <ResponsiveLine
      data={setData()}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: colors.grey[100],
            },
          },
          legend: {
            text: {
              fill: colors.grey[100],
            },
          },
          ticks: {
            line: {
              stroke: colors.grey[100],
              strokeWidth: 1,
            },
            text: {
              fill: colors.grey[100],
            },
          },
        },
        legends: {
          text: {
            fill: colors.grey[100],
          },
        },
        tooltip: {
          container: {
            color: colors.primary[700],
          },
        },

      }}
      colors={isDashboard ? { datum: "color" } : { scheme: "nivo" }} // added
      margin={{ top: 50, right: 110, bottom: 90, left: 60 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      axisTop={null}
      axisRight={null}
      axisBottom={!isDashboard ? {
        orient: "bottom",
        tickSize: 2,
        tickPadding: 10,
        tickRotation: 15,
        legend: "Meassures", // added
        legendOffset: 80,
        legendPosition: "middle",
      } : null}
      axisLeft={{
        orient: "left",
        tickValues: 5, // added
        tickSize: 3,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Amount", // added
        legendOffset: -40,
        legendPosition: "middle",
      }}
      enableGridX={false}
      enableGridY={true}
      pointSize={6}
      enableSlices="x"
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={[
        {
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 100,
          translateY: 0,
          itemsSpacing: 0,
          itemDirection: "left-to-right",
          itemWidth: 80,
          itemHeight: 20,
          itemOpacity: 0.75,
          symbolSize: 12,
          symbolShape: "circle",
          symbolBorderColor: "rgba(0, 0, 0, .5)",
          effects: [
            {
              on: "hover",
              style: {
                itemBackground: "rgba(0, 0, 0, .03)",
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
    />
  );
};

export default LineChart;