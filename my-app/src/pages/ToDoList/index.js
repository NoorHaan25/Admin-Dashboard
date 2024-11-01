import React, { useContext, useEffect, useState } from 'react'
import styles from './ToDoList.module.css'
import { ThemeContext } from '../../components/ThemeContext';
import { addTask, getAllTasks } from '../../services/api';
import axios from 'axios';
function ToDoList() {
  const { darkTheme } = useContext(ThemeContext);
  const [isDragging, setIsDragging] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState({ ToDo: [], Doing: [], Done: [] });

  const handleDragStart = (e, task, status) => {
    setIsDragging(true);
    setCurrentTask({ ...task, status });
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setCurrentTask(null);
  };
  
  const handleDrop = async (e, newStatus) => {
    e.preventDefault();
    if (currentTask && currentTask.status !== newStatus) {
      try {
        await updateTaskStatus(currentTask, newStatus);
        await getAll();
        setCurrentTask(null);
      } catch (err) {
        console.error('error', err);
      }
    }
  };
  
  const updateTaskStatus = async (task, newStatus) => {
    try {
      const response= await getAllTasks();
      const toDoList = response.data;
      toDoList[task.status] = toDoList[task.status].filter((t) => t.id !== task.id);
      task.status = newStatus;
      toDoList[newStatus].push(task);
      await axios.put(`http://localhost:9000/toDOlist`, toDoList);
    } catch (err) {
      console.error('error:', err);
    }
  };
  const addTasks = async (task) => {
    try {
      const response = await getAllTasks();
      const toDoList = response.data;
      toDoList.ToDo.push(task);
      await addTask(toDoList);
      setTasks((prevTasks) => ({
        ...prevTasks,
        ToDo: [...prevTasks.ToDo, task]
      }));
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const handleAddTask = () => {
    if (task.trim()) {
      const newTask = { id: Date.now(), name: task };
      setTask('');
      addTasks(newTask);
    }
  };

  const getAll = async () => {
    try {
      const response = await getAllTasks();;
      setTasks(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAll();
  }, []);
  return (
    <>
      <div className={`${styles['todo-container']} ${darkTheme ? "darkBorder" : "lightBorder"}`}>
        <div>
          <input
            type="text"
            name="task"
            placeholder="Add Task"
            className={`${darkTheme ? "darkTextColor darkBorder" : "lightTextColor lightBorder"}`}
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <button onClick={handleAddTask} className={styles["button-task"]}>Add Task</button>
        </div>
        <div className={styles["boxs-container"]}>
          {['ToDo', 'Doing', 'Done'].map((status) => (
            <div
              key={status}
              className={`${styles["box"]} ${darkTheme ? "darkBorder" : "lightBorder"}`}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, status)}
            >
              <h3 className={`${darkTheme ? "darkText" : "lightText"}`}>{status}</h3>
              <ul className={styles['tasks']}>
                {tasks[status].map((task) => (
                  <li
                    key={task.id}
                    className={`${styles["task"]} ${isDragging && styles['is-dragging']} ${status === 'Done' && styles['tasks-done']} ${darkTheme ? styles["dark-theme"] : styles["light-theme"]}`}
                    draggable="true"
                    onDragStart={(e) => handleDragStart(e, task, status)}
                    onDragEnd={handleDragEnd}
                  >
                    {task.name}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default ToDoList;
