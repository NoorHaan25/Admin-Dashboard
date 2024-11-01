import React, { useContext, useEffect, useState } from 'react'
import { ResponsiveLine } from '@nivo/line'
import { ThemeContext } from "../../components/ThemeContext";
import { getAllHabits } from "../../services/api";
function LineChart() {
    const { darkTheme } = useContext(ThemeContext);
    const [habits, setHabits] = useState([]);
    const getAll = async () => {
        try {
            const response = await getAllHabits();
            setHabits(response.data);
        } catch (err) {
            console.log(err);
        }
    };
    const calculateProgress = (checkedDays, targetDays) => {
        return Math.min(Math.floor((checkedDays / targetDays) * 100), 100);
    };
    const data = habits.map(habit => ({
        id: habit.HabitName,
        data: [
            { x: 'Target', y: habit.TargetDays || 0 },
            { x: 'Checked Days', y: habit.checkedDays || 0 },
            { x: 'Progress', y: calculateProgress(habit.checkedDays, habit.TargetDays) || 0}
        ]
    }));
    useEffect(() => {
        getAll();
    }, []);
    return (
        <>
            {habits.length > 0 && (
                <ResponsiveLine
                    data={data}
                    margin={{ top: 50, right: 130, bottom: 70, left: 80 }}
                    xScale={{ type: 'point' }}
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: 'auto',
                        stacked: true,
                        reverse: false
                    }}
                    curve="basis"
                    yFormat={value => Math.floor(value)}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Habit Data',
                        legendPosition: 'middle',
                        legendOffset: 40,
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Progress (%)',
                        legendPosition: 'middle',
                        legendOffset: -50,
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
                        }
                    }}
                    pointSize={10}
                    pointColor={{ theme: 'background' }}
                    pointBorderWidth={2}
                    pointBorderColor={{ from: 'serieColor' }}
                    pointLabelYOffset={-12}
                    useMesh={true}
                    legends={[
                        {
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemTextColor: darkTheme ? "#ffffff" : "#000000",
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />
            )}
        </>
    );
}
export default LineChart;