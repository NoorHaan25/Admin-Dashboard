import React, { useContext, useEffect, useState } from 'react'
import styles from "./Team.module.css";
import { ThemeContext } from '../../components/ThemeContext';
import { deleteHabit, getAllHabits, updateHabit } from '../../services/api';
import { useNavigate } from "react-router-dom"
function Team() {
  const navigate = useNavigate();
  const { darkTheme } = useContext(ThemeContext);
  const [habits , setHabits] = useState([])
  const getAll = async()=>{
    try{
      const response = await getAllHabits();
      setHabits(response.data);
    }catch(err){
      console.log(err);
    }
  }
  const deleteSelectedHabit = (id)=>{
    console.log(`deleteHabit ${id}`);
    deleteHabit(id).then((res)=>{
      if(res.status == 200 || res.status == 201){
        getAll();
      }
    })
    
  }
  const updateSelectedHabit =(id , data)=>{
    console.log(`updateHabit ${id}`);
    updateHabit(id).then((res)=>{
      console.log( res);
      navigate('/form', { state: { habit: data, isEditing: true } });
    });
    
  }
  useEffect(() => {
    getAll();
  }, []);
  const habitsList = habits.map((habit)=>{
    return(
      <tr className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`} key={habit.id}>
      <td className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>{habit.HabitName}</td>
      <td className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>{habit.TargetFrequency}</td>
      <td className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>{habit.LastCompleted}</td>
      <td className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}><span >{habit.Progress}</span></td>
      <td className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>
        <button className={`${styles['deleteButton']} ${darkTheme ? "darkTextColor" : "lightTextColor"}`} onClick={()=>{deleteSelectedHabit(habit.id)}}>Delete</button>
        <button className={`${styles['updateButton']} ${darkTheme ? "darkTextColor" : "lightTextColor"}`} onClick={()=>{updateSelectedHabit(habit.id , habit)}}>Update</button>
      </td>
    </tr>
    )
  })
  return (
    <div className={`${styles["wrapper-table"]}`}>
      <table className={`${darkTheme ? "darkBorder" : "lightBorder"}`}>
        <thead>
          <tr className={`${darkTheme ? "darkBorder" : "lightBorder"}`}>
            <th className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>Habit Name</th>
            <th className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>Target Frequency</th>
            <th className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>Last Completed</th>
            <th className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>Progress</th>
            <th className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>Action</th>
          </tr>
        </thead>
        <tbody>
            {habitsList}
        </tbody>
      </table>
    </div>
  )
}

export default Team