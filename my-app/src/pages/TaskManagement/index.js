import React, { useContext, useEffect, useState } from 'react'
import styles from "./TaskManagement.module.css";
import { ThemeContext } from '../../components/ThemeContext';
import {deleteHabit, getAllHabits  , updateHabit} from '../../services/api';
function TaskManagement() {
  const { darkTheme } = useContext(ThemeContext);
  const [habits, setHabits] = useState([]);
  const getAll = async () => {
    try {
      const response = await getAllHabits();
      const habitsData = response.data.map(habit => ({
        ...habit,
        checkedDays: habit.checkedDays || 0, 
        missedDays: habit.missedDays || 0, 
        lastCheckedDate: habit.lastCheckedDate || null,
        Status:getStatus(habit.checkedDays, habit.TargetDays),
        isDoneToday: false
      }));
      setHabits(habitsData);
    } catch (err) {
      console.log(err);
    }
  };
  const updateSelectedHabit = async (id, data) => {
    try {
      const response = await updateHabit(id, data); 
      console.log(`Habit updated: ${response.data}`);
    } catch (error) {
      console.error("Error updating habit", error);
    }
  };
  const handleCheckboxChange = (habitId, event) => {
    const today = new Date().toISOString().slice(0, 10);
    console.log('today: ' , today);
    setHabits(prevHabits =>
      prevHabits.map(habit => {
        if (habit.id === habitId) {
          let updatedHabit = { ...habit };
          if (habit.lastCheckedDate && habit.lastCheckedDate !== today) {
            updatedHabit.missedDays += 1;
          }
          if (event.target.checked && updatedHabit.checkedDays < updatedHabit.TargetDays) {
            updatedHabit.checkedDays += 1;
          }
          updatedHabit.lastCheckedDate = today; 
          updatedHabit.isDoneToday = event.target.checked;
          console.log('rrr' , event.target.checked);
          updateSelectedHabit(habitId, updatedHabit);
          return updatedHabit;
        }
        return habit;
      })
    );
  };
  const getProgressColor = (checkedDays, targetDays) => {
    const progress = (checkedDays / targetDays) * 100;
    if (progress <= 33) {
      return "#ff4d4d";
    } else if (progress <= 66) {
      return "#ffcc00"; 
    } else {
      return "#4caf50"; 
    }
  };
  const getStatus = (checkedDays, targetDays) => {
    const progress = (checkedDays / targetDays) * 100;
    if (progress === 100) {
      return "Done";
    } else if (progress > 0) {
      return "In Progress";
    } else {
      return "Pending";
    }
  };
  const deleteSelectedHabit = (id)=>{
    console.log(`deleteHabit ${id}`);
    deleteHabit(id).then((res)=>{
      if(res.status == 200 || res.status == 201){
        getAll();
      }
    })
    
  }
  useEffect(() => {
    getAll();
  }, []);
  const habitsList = habits.map(habit => (
    <tr className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`} key={habit.id}>
      <td className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>{habit.HabitName}</td>
      <td className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>{habit.TargetDays}</td>
      <td className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>{habit.checkedDays}</td>
      <td className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>
        <div className={styles['progress-bar']}>
          <span style={{width: `${(habit.checkedDays / habit.TargetDays) * 100}%`, backgroundColor: getProgressColor(habit.checkedDays , habit.TargetDays)}}></span>
          <span >{Math.floor((habit.checkedDays / habit.TargetDays) * 100)}%</span>
        </div>
      </td>
      <td className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>{habit.Status}</td>
      <td className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>
        <div>
          {habit.checkedDays >= habit.TargetDays ? (
            <span>Habit Completed</span>
          ) : (
            <input
              type='checkbox'
              checked={habit.isDoneToday}
              onChange={(event) => handleCheckboxChange(habit.id, event)}
            />
          )}
        </div>
      </td>
      <td className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>
        <span className={styles['missed-days']}>Missed Days: {habit.missedDays}</span>
      </td>
      <td className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`} onClick={()=>{deleteSelectedHabit(habit.id)}}>
        <span className={styles['deleteButton']}>Delete</span>
      </td>
    </tr>
  ));

  return (
    <div className={`${styles["wrapper-table"]}`}>
      <table className={`${darkTheme ? "darkBorder" : "lightBorder"}`}>
        <thead>
          <tr className={`${darkTheme ? "darkBorder" : "lightBorder"}`}>
            <th className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>Habit Name</th>
            <th className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>Target Days</th>
            <th className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>Days Done</th>
            <th className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>Progress Bar</th>
            <th className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>Status</th>
            <th className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>Done Today</th>
            <th className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>Missed Days</th>
            <th className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>Action</th>
          </tr>
        </thead>
        <tbody>
          {habitsList}
        </tbody>
      </table>
    </div>
  );
}
export default TaskManagement;
