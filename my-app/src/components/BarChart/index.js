import React, { useEffect, useState, useContext } from "react";
import { getAllHabits } from "../../services/api";
import { ThemeContext } from "../ThemeContext";
import { ResponsiveBar } from "@nivo/bar";
function BarChart() {
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
        habit: habit.HabitName,
        target: habit.TargetDays,
        progress: calculateProgress(habit.checkedDays, habit.TargetDays) || 0
    }));

    useEffect(() => {
        getAll();
    }, []);

    return (
        <>
            {habits.length > 0 && (
                <ResponsiveBar
                    data={data}
                    keys={['progress', 'target']}
                    indexBy="habit"
                    margin={{ top: 80, right: 130, bottom:120, left: 80 }}
                    padding={0.3}
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={['rgb(188, 150, 202)', '#9B7DA3', '#ECE3F0']}
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
                            }
                        }
                    }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 10,
                        tickRotation: 90,
                        legend: 'Habit Name',
                        legendPosition: 'left',
                        legendOffset: 80,
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'Progress (%)',
                        legendPosition: 'middle',
                        legendOffset: -50,
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{
                        from: 'color',
                        modifiers: [
                            ['darker', 1.6]
                        ]
                    }}
                    barHeight={30}
                    legends={[
                        {
                            dataFrom: 'keys',
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
                            fill: [
                                { match: { id: "progress" }, id: "progressColor" },
                                { match: { id: "target" }, id: "targetColor" }
                            ],
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
                    role="application"
                    ariaLabel="Nivo bar chart demo"
                    barAriaLabel={(e) => `${e.id}: ${e.formattedValue} in habit: ${e.indexValue}`}
                />
            )}
        </>
    );
}
export default BarChart;
