import React, { useContext, useEffect, useState } from "react";
import { ResponsivePie } from "@nivo/pie";
import { ThemeContext } from "../../components/ThemeContext";
import { getAllHabits } from "../../services/api";

function Pie() {
  const { darkTheme } = useContext(ThemeContext);
  const [habits, setHabits] = useState([])
  const getAll = async () => {
      try {
          const response = await getAllHabits();
          setHabits(response.data);
          console.log('setHabits', response.data);
          // getAll()
      } catch (err) {
          console.log(err);
      }
  }
  const data = habits.map(habit => ({
      id: habit.HabitName,
      value: parseInt(habit.Progress)
  }))
  useEffect(() => {
      getAll();
  }, []);
  return (
    <div style={{height:"100vh"}}>
    {habits.length > 0 && (
      <ResponsivePie
        data={data}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={0.7}
        cornerRadius={3}
        activeOuterRadiusOffset={8}
        colors={['#F0F7E0', '#D3BBDD', '#BC96CA', '#95BA61']}
        theme={{
          labels:{
            text: {
            fill: darkTheme ? "#ffffff" : "#000000", 
            fontSize: 12,  
            fontWeight: "bold",
          },
          }
        }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor={darkTheme ? "#ffffff" : "#0000000"}
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
            direction: "row",
            justify: false,
            translateX: 0,
            translateY: 56,
            itemsSpacing: 0,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: darkTheme ? "#ffffff" : "#000000",
            itemDirection: "left-to-right",
            itemOpacity: 1,
            symbolSize: 18,
            symbolShape: "circle",
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

export default Pie;
