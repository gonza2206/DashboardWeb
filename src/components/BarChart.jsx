import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { mockBarData as data } from "../data/mockData";
import { useEffect } from "react";


const BarChart = ({ isDashboard = false, frame = [0, 0, 0, 0, 0, 0, 0] }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const BarData = [{
    harmonic: "H1",
    Harmonics: parseFloat(frame[0]).toFixed(2),
    HarmonicsColor: "hsl(296, 70%, 50%)",
  },
  {
    harmonic: "H2",
    Harmonics: parseFloat(frame[1]).toFixed(2),
    HarmonicsColor: "hsl(296, 70%, 50%)",
  },
  {
    harmonic: "H3",
    Harmonics: parseFloat(frame[2]).toFixed(2),
    HarmonicsColor: "hsl(296, 70%, 50%)",
  },
  {
    harmonic: "H4",
    Harmonics: parseFloat(frame[3]).toFixed(2),
    HarmonicsColor: "hsl(296, 70%, 50%)",
  },
  {
    harmonic: "H5",
    Harmonics: parseFloat(frame[4]).toFixed(2),
    HarmonicsColor: "hsl(296, 70%, 50%)",
  },
  {
    harmonic: "H6",
    Harmonics: parseFloat(frame[5]).toFixed(2),
    HarmonicsColor: "hsl(296, 70%, 50%)",
  },
  {
    harmonic: "H7",
    Harmonics: parseFloat(frame[6]).toFixed(2),
    HarmonicsColor: "hsl(296, 70%, 50%)",
  }]


  return (
    <ResponsiveBar
      data={BarData} //Pasar objeto con la informacion
      theme={{
        // added
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
      }}
      keys={["Harmonics"]}
      indexBy="harmonic"
      margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
      padding={isDashboard===true? 0.6 : 0.5}
      valueScale={{ type: "linear" }}
      indexScale={{ type: "band", round: true }}
      colors={{ scheme: "nivo" }}
      defs={[
        {
          id: "dots",
          type: "patternDots",
          background: "inherit",
          color: "#38bcb2",
          size: 4,
          padding: 1,
          stagger: true,
        },
        {
          id: "lines",
          type: "patternLines",
          background: "inherit",
          color: "#eed312",
          rotation: -45,
          lineWidth: 6,
          spacing: 10,
        },
      ]}
      borderColor={{
        from: "color",
        modifiers: [["darker", "1.6"]],
      }}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "Harmonics", // changed
        legendPosition: "middle",
        legendOffset: 40,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? undefined : "%", // changed
        legendPosition: "middle",
        legendOffset: -40,
      }}
      enableLabel={true}
      labelSkipWidth={20}
      labelSkipHeight={20}
      labelTextColor={{
        from: "color",
        modifiers: [["darker", 6]],
      }}
      legends={[
        {
          dataFrom: "keys",
          anchor: "bottom-right",
          direction: "column",
          justify: false,
          translateX: 120,
          translateY: 0,
          itemsSpacing: 2,
          itemWidth: 100,
          itemHeight: 20,
          itemDirection: "left-to-right",
          itemOpacity: 0.85,
          symbolSize: 20,
          effects: [
            {
              on: "hover",
              style: {
                itemOpacity: 1,
              },
            },
          ],
        },
      ]}
      tooltip={({value }) => (
            <div
                style={{
                    padding: 12,
                    color:colors.greenAccent[500],
                    background: colors.primary[600],
                }}
            >
                <span>Value </span>
                
                <strong>
                    {value}
                </strong>
            </div>
        )}
      isInteractive={true}
      role="application"
      barAriaLabel={function (e) {
        return e.id + ": " + e.formattedValue + " in country: " + e.indexValue;
      }}
    />
  );
};

export default BarChart;