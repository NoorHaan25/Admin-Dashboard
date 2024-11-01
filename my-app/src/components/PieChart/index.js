import React, { useContext, useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { ThemeContext } from "../../components/ThemeContext";
import { getAllHabits } from "../../services/api";

function PieChart({translateX , bottom}) {
  const { darkTheme } = useContext(ThemeContext);
  const [habits, setHabits] = useState([]);
  const [progress, setProgress] = useState([]);

  const getAll = async () => {
    try {
      const response = await getAllHabits();
      setHabits(response.data);
      console.log("setHabits", response.data);
    } catch (err) {
      console.log(err);
    }
  };
  const calculateProgress = (checkedDays, targetDays) => {
    return Math.min(Math.floor((checkedDays / targetDays) * 100), 100);
  };

  const data = habits.map((habit) => ({
    id: habit.HabitName,
    value: calculateProgress(habit.checkedDays, habit.TargetDays),
  }));

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    const newProgressList = habits.map((habit) =>
      calculateProgress(habit.checkedDays, habit.TargetDays)
    );
    setProgress(newProgressList);
  }, [habits]);

  return (
    <div style={{ height: "100vh" }}>
        {habits.length > 0 && (
            <ResponsivePie
                data={data}
                margin={{ top: 40, right: 100, bottom: bottom, left: 100 }}
                innerRadius={0.5}
                padAngle={0.7}
                cornerRadius={3}
                activeOuterRadiusOffset={8}
                colors={["#F0F7E0", "#D3BBDD", "#BC96CA", "#95BA61"]}
                theme={{
                    labels: {
                        text: {
                            fill: darkTheme ? "#ffffff" : "#000000",
                            fontSize: 12,
                            fontWeight: "bold",
                        },
                    },
                }}
                borderWidth={1}
                borderColor={{
                    from: "color",
                    modifiers: [["darker", 0.2]],
                }}
                arcLinkLabelsSkipAngle={10}
                arcLinkLabelsTextColor={darkTheme ? "#ffffff" : "#000000"}
                arcLinkLabelsThickness={2}
                arcLinkLabelsColor={{ from: "color" }}
                arcLabelsSkipAngle={10}
                arcLabelsTextColor={{
                    from: "color",
                    modifiers: [["darker", 2]],
                }}
                defs={[
                    {
                        id: "dots",
                        type: "patternDots",
                        background: "inherit",
                        color: "rgba(255, 255, 255, 0.3)",
                        size: 4,
                        padding: 1,
                        stagger: true,
                    },
                    {
                        id: "lines",
                        type: "patternLines",
                        background: "inherit",
                        color: "rgba(255, 255, 255, 0.3)",
                        rotation: -45,
                        lineWidth: 6,
                        spacing: 10,
                    },
                ]}
                legends={[
                    {
                        anchor: "bottom",
                        direction: "column",
                        justify: false,
                        translateX: translateX,
                        translateY: 100,
                        itemsSpacing: 3, 
                        itemWidth: 100,
                        itemHeight: 20,
                        itemTextColor: darkTheme ? "#ffffff" : "#000000",
                        itemDirection: "left-to-right",
                        itemOpacity: 1,
                        symbolSize: 18,
                        symbolShape: "square",
                        effects: [
                            {
                                on: "hover",
                                style: {
                                    itemTextColor: darkTheme ? "#ffffff" : "#000000",
                                },
                            },
                        ],
                    },
                ]}
            />
        )}
    </div>
);

}
export default PieChart;
