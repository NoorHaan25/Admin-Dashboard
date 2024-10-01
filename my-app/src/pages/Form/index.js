import React, { useContext, useEffect, useState } from "react";
import styles from "./Form.module.css";
import { ThemeContext } from "../../components/ThemeContext";
import { addHabit, updateHabit } from "../../services/api";
import { useLocation, useNavigate } from "react-router-dom"
function Form() {
  const navigate = useNavigate()
  const { darkTheme, habitName, setHabitName, targetFrequency, setTargetFrequency, lastCompleted, setLastCompleted, progress, setProgress} = useContext(ThemeContext);
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.isEditing) {
        const habit = location.state.habit;
        setHabitName(habit.HabitName);
        setTargetFrequency(habit.TargetFrequency);
        setLastCompleted(habit.LastCompleted);
        setProgress(habit.Progress);
    }
}, []);
  const onSubmitHandler = (e) => {
    const habitData ={
      HabitName:habitName,
      TargetFrequency:targetFrequency,
      LastCompleted:lastCompleted,
      Progress:progress,
    }
    e.preventDefault();
    // console.log(habitName, targetFrequency, lastCompleted, Progress);
    if (location.state && location.state.isEditing){
      updateHabit(location.state.habit.id, habitData).then((res)=>{
        if(res.status === 200 || res.status === 201){
          navigate("/Team")
        }
      })
    }else{
      addHabit(habitData).then((res) => {
        // console.log(res);
        if(res.status === 200 || res.status === 201){
          navigate("/Team")
        }
      });
    }
    
  };
  return (
    <div className={styles["wrapper-form"]}>
      <div className={styles["heading"]}>
        <h1 className={`${darkTheme ? "darkText" : "lightText"}`}>
          Admin Form
        </h1>
      </div>
      <form onSubmit={onSubmitHandler}>
        <div className={styles["wrapper-input"]}>
          <label
            htmlFor="habitName"
            className={`${darkTheme ? "darkText" : "lightText"}`}
          >
            Add Habit Name
          </label>
          <input
            id="habitName"
            type="text"
            className={`${darkTheme ? "darkBorderTop darkTextColor" : "lightBorderTop lightTextColor"}`}
            value={habitName}
            onChange={(e) => {
              setHabitName(e.target.value);
            }}
            required
          />
        </div>
        <div className={styles["wrapper-input"]}>
          <label
            htmlFor="frequency"
            className={`${darkTheme ? "darkText" : "lightText"}`}
          >
            Target Frequency
          </label>
          <input
            id="frequency"
            type="text"
            className={`${darkTheme ? "darkBorderTop darkTextColor" : "lightBorderTop lightTextColor"}`}
            value={targetFrequency}
            onChange={(e) => {
              setTargetFrequency(e.target.value);
            }}
            required
          />
        </div>
        <div className={styles["wrapper-input"]}>
          <label
            htmlFor="habitName"
            className={`${darkTheme ? "darkText" : "lightText"}`}
          >
            Last Completed
          </label>
          <input
            id="habitName"
            type="text"
            className={`${darkTheme ? "darkBorderTop darkTextColor" : "lightBorderTop lightTextColor"}`}
            value={lastCompleted}
            onChange={(e) => {
              setLastCompleted(e.target.value);
            }}
            required
          />
        </div>
        <div className={styles["wrapper-input"]}>
          <label
            htmlFor="progress"
            className={`${darkTheme ? "darkText" : "lightText"}`}
          >
            Progress
          </label>
          <input
            id="progress"
            type="text"
            className={`${darkTheme ? "darkBorderTop darkTextColor" : "lightBorderTop lightTextColor"}`}
            value={progress}
            onChange={(e) => {
              setProgress(e.target.value);
            }}
            required
          />
        </div>
        <div className={styles["wrapper-submit"]}>
          <input type="submit" value={location.state && location.state.isEditing ? "Update Habit" : "Add Habit"} />
        </div>
      </form>
    </div>
  );
}

export default Form;
