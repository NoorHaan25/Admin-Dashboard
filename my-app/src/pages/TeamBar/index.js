import React, { useContext } from 'react';
import { ResponsiveBar } from "@nivo/bar";
import { ThemeContext } from '../../components/ThemeContext';
import BarChart from '../../components/BarChart';

function TeamBar() {
  const { darkTheme } = useContext(ThemeContext);
  const teamPerformanceData = [
    { teamMember: 'Taha', tasksCompleted: 35 },
    { teamMember: 'Wafaa', tasksCompleted: 35 },
    { teamMember: 'Mohamed', tasksCompleted: 20 },
    { teamMember: 'Aya', tasksCompleted: 30 },
    { teamMember: 'NoorHan', tasksCompleted: 25 },
    { teamMember: 'Aya', tasksCompleted: 15 },
  ];

  return (
    <div style={{height:"80vh"}}>
    <BarChart data={teamPerformanceData} keys='tasksCompleted' indexBy='teamMember' padding={0.5} legendBottom="Team Members" legendLeft="Completed Tasks"/>
      {/*<ResponsiveBar
        data={teamPerformanceData}
        keys={['tasksCompleted']}
        indexBy="teamMember"
        margin={{ top: 50, right: 180, bottom: 70, left: 160 }}
        padding={0.5}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={(datum) => {
          if (datum.indexValue === "July") return "#6a0dad";
          return "#b19cd9";
        }}
        theme={{
          axis: {
            ticks: {
              text: {
                fill: darkTheme ? "#ffffff" : "#0000000",
              },
            },
            legend: {
              text: {
                fill: "#C197D2",
                fontSize:"12px",
                fontWeight: "bold",
              },
            },
          },
          legends: {
            text: {
              fill: darkTheme ? "#ffffff" : "#000000", 
            },
          },
          labels:{
            text: {
            fill: darkTheme ? "#ffffff" : "#000000", 
            fontSize: 15,  
            fontWeight: "bold",
          },
          }
        }}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Team Members',
          legendPosition: 'middle',
          legendOffset: 60,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: 'Completed Tasks',
          legendPosition: 'middle',
          legendOffset: -70,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#ffffff"
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            textColor: darkTheme ? "#ffffff" : "#000000",
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
        role="application"
        ariaLabel="Nivo bar chart demo"
        barAriaLabel={(e) =>
          e.id + ": " + e.formattedValue + " in month: " + e.indexValue
        }
      />*/}
    </div>
  )
}

export default TeamBar