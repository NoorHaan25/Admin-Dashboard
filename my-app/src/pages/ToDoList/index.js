import React, { useContext, useState } from 'react'
import styles from './ToDoList.module.css'
import { ThemeContext } from '../../components/ThemeContext';
function ToDoList() {
  const { darkTheme } = useContext(ThemeContext);
  const [isDragging , setIsDragging] = useState(false);
  const [currentTask , setCurrentTask] = useState(null);
  const [task , setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const handelDragStart = (e)=>{
    setIsDragging(true); 
    setCurrentTask(e.target);
    console.log(e.target);
    
  }
  const handelDragEnd = ()=>{
    setIsDragging(false); 
    setCurrentTask(null);
  }
  const handelDrog = (e )=>{
    const ul = e.target.closest('ul');
    
    e.preventDefault();
    if (currentTask && !ul.contains(currentTask)) {
      ul.appendChild(currentTask)
    }
  }
  const handleAddTask = () => {
    if (task.trim()) {
      const newTask = { id: Date.now(), name: task };
      setTasks([...tasks, newTask]);
      setTask('');
    }
  };
  return (
    <>
      <div className={`${styles['todo-container']} ${darkTheme ? "darkBorder" : "lightBorder"}`}>
          <input type="text" name="task" placeholder='Add Task' className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`} value={task} onChange={(e) =>{
            setTask(e.target.value);
          }} />
          <button onClick={handleAddTask}>Add Task</button>
        <div className={styles["boxs-container"]}>
          <div className={`${styles["box"]} ${darkTheme ? "darkBorder" : "lightBorder"}`}>
            <h3 className={`${darkTheme ? " darkText" : " lightText"}`}>ToDo</h3>
            <ul className={`${styles['tasks']} `} onDragOver={(e) => handelDrog(e, e.target)}>
            {tasks.map((task) => (
              <li
                key={task.id}
                className={`${styles["task"]} ${isDragging && styles['is-dragging']} ${darkTheme ? styles["dark-theme"] : styles["light-theme"]}`}
                draggable="true"
                onDragStart={(e) => handelDragStart(e)}
                onDragEnd={handelDragEnd}
              >
                {task.name}
              </li>
            ))}
            </ul>
          </div>
          <div className={`${styles["box"]} ${darkTheme ? "darkBorder" : "lightBorder"}`}>
            <h3 className={`${darkTheme ? " darkText" : " lightTexe"}`}>Doing</h3>
            <ul className={styles['tasks']} onDragOver={(e) => handelDrog(e, e.target)}>
              
            </ul>
          </div>
          <div className={`${styles["box"]} ${darkTheme ? "darkBorder" : "lightBorder"}`} >
            <h3 className={`${darkTheme ? " darkText" : " lightTexe"}`}>Done</h3>
            <ul className={`${styles['tasks']} ${styles['tasks-done']}`} onDragOver={(e) => handelDrog(e, e.target)}>
              
            </ul>
          </div>
        </div>
      </div>
    </>
  )
}

export default ToDoList;