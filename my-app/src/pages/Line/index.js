import React, { useContext, useEffect, useState } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { ThemeContext } from "../../components/ThemeContext";
import { getAllHabits } from "../../services/api";
function Line() {
  const { darkTheme } = useContext(ThemeContext);
  const [habits, setHabits] = useState([])
  const getAll = async () => {
      try {
          const response = await getAllHabits();
          setHabits(response.data);
      } catch (err) {
          console.log(err);
      }
  }
  const data = habits.map(habit => ({
    id: habit.HabitName,
    data: [
      { x: 'Target', y: parseInt(habit.TargetFrequency) },
      { x: 'Last Completed', y: parseInt(habit.LastCompleted) },
      { x: 'Progress', y: parseInt(habit.Progress) }
    ]
  }));
  useEffect(() => {
      getAll();
  }, []);
  return (
    <ResponsiveLine
        data={data}
        margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
        xScale={{ type: 'point' }}
        yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: true,
            reverse: false
        }}
        yFormat=" >-.2f"
        axisTop={null}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: 36,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendOffset: -40,
            legendPosition: 'middle',
            truncateTickAt: 0
        }}
        theme={{
          axis: {
              ticks: {
                  text: {
                      fill: darkTheme ? "#ffffff" : "#000000",
                  },
              },
              legend: {
                  text: {
                      fill: darkTheme ? "#ffffff" : "#000000",
                  },
              },
          },
          grid: {
      line: {
        stroke: darkTheme ? "#ffffff" : "#000000",
        strokeWidth: 1,
      },
      vertical: true,
      horizontal: true,
    },
          legends: {
            text: {
                fill: darkTheme ? "#ffffff" : "#000000",
            },
        },
      }}
        pointSize={10}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={2}
        pointBorderColor={{ from: 'serieColor' }}
        pointLabel="data.yFormatted"
        pointLabelYOffset={-12}
        enableTouchCrosshair={true}
        useMesh={true}
        legends={[
            {
                anchor: 'bottom-right',
                direction: 'column',
                justify: false,
                translateX: 100,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: 'left-to-right',
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: 'circle',
                symbolBorderColor: 'rgba(0, 0, 0, .5)',
                effects: [
                    {
                        on: 'hover',
                        style: {
                            itemBackground: 'rgba(0, 0, 0, .03)',
                            itemOpacity: 1
                        }
                    }
                ]
            }
        ]}
        curve="catmullRom"
        
    />
  )
}

export default Line;