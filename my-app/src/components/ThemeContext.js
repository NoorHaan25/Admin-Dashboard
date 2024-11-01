import React, { createContext, useEffect, useState } from 'react';
export const ThemeContext = createContext();
export const ThemeProvider = ({ children }) => {
  const [darkTheme, setDarkTheme] = useState(() => {
    const savedTheme = localStorage.getItem('darkTheme');
    // console.log('savedTheme', savedTheme);
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  const [habitName, setHabitName] = useState("");
  const [targetFrequency, setTargetFrequency] = useState("");
  const [lastCompleted, setLastCompleted] = useState("");
  const [progressList, setProgressList] = useState([]);
  useEffect(() => {
    localStorage.setItem('darkTheme', JSON.stringify(darkTheme));
  }, [darkTheme]);
  return (
    <ThemeContext.Provider value={{
      darkTheme, setDarkTheme,
      habitName, setHabitName,
      targetFrequency, setTargetFrequency,
      lastCompleted, setLastCompleted,
      progressList, setProgressList
    }}>
      {children}
    </ThemeContext.Provider>
  );
};