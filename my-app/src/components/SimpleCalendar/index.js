import React, { useContext, useEffect, useState } from 'react'
import { ThemeContext } from '../ThemeContext';
import styles from "./SimpleCalendar.module.css";
function SimpleCalendar() {
  const { darkTheme } = useContext(ThemeContext);
  const [calendarDate, setCalendarDate] = useState('');
  const [days, setDays] = useState([]);
  let [month, setMonth] = useState(new Date().getMonth());
  let [year, setYear] = useState(new Date().getFullYear());
  let [activeDate, setActiveDate] = useState('');
  function initCalendar() {
    const firstDayCurrentMonth = new Date(year, month, 1);
    const lastDayCurrentMonth = new Date(year, month + 1, 0);
    const prevMonthLastDay = new Date(year, month, 0);
    const prevMonthLastDayNumber = prevMonthLastDay.getDate();
    const lastDayCurrentMonthNumber = lastDayCurrentMonth.getDate();
    const firstDayCurrentMonthNumber = firstDayCurrentMonth.getDay();
    const nextDay = 7 - lastDayCurrentMonth.getDay() - 1;
    let generatedDays = [];
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    for (let i = firstDayCurrentMonthNumber; i > 0; i--) {
      const prevDay = prevMonthLastDayNumber - i + 1;
      const prevMonthKey = `${year}-${month}-${prevDay}`;
      console.log('prevDay', prevMonthKey);
      let isActive = prevMonthKey === activeDate;
      generatedDays.push(<span className={` ${isActive ? styles['active'] : ''} ${styles.day} ${styles["prev-date"]} ${darkTheme ? "darkBorder" : "lightBorder"}`} onClick={() => handlePrevDate(prevDay)} key={`prev-${i}`}>{prevMonthLastDayNumber - i + 1}</span>);
    }
    for (let i = 1; i <= lastDayCurrentMonthNumber; i++) {
      let event = false;
      const dateKey = `${year}-${month + 1}-${i}`;
      let isActive = dateKey === activeDate;
      if (
        i === new Date().getDate() &&
        year === new Date().getFullYear() &&
        month === new Date().getMonth()
      ) {
        if (event) {
          generatedDays.push(<span className={`${styles['day']} ${styles.today} ${isActive ? styles['active'] : ''} ${styles.event} ${darkTheme ? "darkBorder" : "lightBorder"}`} key={`current-${i}`}>{i}</span>);
        } else {
          generatedDays.push(<span className={`${styles['day']} ${styles.today} ${isActive ? styles['active'] : ''} ${darkTheme ? "darkBorder" : "lightBorder"}`} key={`current-${i}`}>{i}</span>);
        }
      } else {
        if (event) {
          generatedDays.push(<span className={`${styles['day']} ${styles.event}  ${isActive ? styles['active'] : ''} ${darkTheme ? "darkBorder" : "lightBorder"}`} >{i}</span>);
        }
        else {
          generatedDays.push(<span className={`${styles['day']} ${isActive ? styles['active'] : ''} ${darkTheme ? "darkBorder" : "lightBorder"}`} >{i}</span>);
        }
      }
    }
    for (let i = 1; i <= nextDay; i++) {
      console.log(month);

      const dateKey = `${year}-${month + 2}-${i}`;
      let isActive = dateKey === activeDate;
      generatedDays.push(<span className={` ${isActive ? styles['active'] : ''} ${styles.day} ${styles['next-date']}  ${darkTheme ? "darkBorder" : "lightBorder"}`} onClick={() => handleNextDate(i)} key={`next-${i}`}>{i}</span>);
    }
    setDays(generatedDays)
    setCalendarDate(`${months[month]} ${year}`)
  }
  function prevMonth() {
    if (month == 0) {
      setMonth(11);
      setYear(year - 1);
    } else {
      setMonth(month - 1)
    }
  }
  function nextMonth() {
    if (month == 11) {
      setMonth(0);
      setYear(year + 1);
    } else {
      setMonth(month + 1)
    }
  }
  function handleNextDate(day) {
    nextMonth();
    let newMonth = month + 2;
    let newYear = year;
    const nextMonthDate = new Date(year, month + 1, day);
    if (newMonth > 12) {
      newMonth = 1;
      newYear = year + 1;
    }
    const dateKey = `${newYear}-${newMonth}-${day}`;
    setActiveDate(dateKey);
 
  }
  function handlePrevDate(day) {
    prevMonth();
    const prevMonthDate = new Date(year, month - 1, day);
    const prevMonthKey = `${prevMonthDate.getFullYear()}-${prevMonthDate.getMonth() + 1}-${day}`;
    if (prevMonthDate.getMonth() === 11) {
      setYear(prevMonthDate.getFullYear());
    }
    setMonth(prevMonthDate.getMonth());
    setYear(prevMonthDate.getFullYear());
    setActiveDate(prevMonthKey);
  
  }
  function todayButton() {
    const today = new Date();
    const currentmonth = today.getMonth();
    const currentyear = today.getFullYear();
    setMonth(currentmonth);
    setYear(currentyear);
  };
  useEffect(() => {
    initCalendar()
  }, [year, month, activeDate])
  return (
    <div>
    <div className={styles['wrapper-calendar']}>
        <div className={`${styles['calendar']} ${darkTheme ? "dark" : "light"}`}>
          <div className={styles["month"]}>
            <div className={styles['prev']} onClick={() => { prevMonth() }}>
              <img src={require(`../../image/icons/left-arrow-${darkTheme ? 'dark' : 'light'}.png`)} alt='arrow-left' />
            </div>
            <div className={styles["date"]}>{calendarDate}</div>
            <div className={styles['next']} onClick={() => { nextMonth() }}>
              <img src={require(`../../image/icons/right-arrow-${darkTheme ? 'dark' : 'light'}.png`)} alt='arrow-right' />
            </div>
          </div>
          <div className={styles["weekdays"]}>
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>
          <div className={styles["days"]}>
            {days}
          </div>
          <div className={styles["wrapper-event"]}>
            <div className={styles["today-button"]}>
              <button onClick={() => { todayButton() }}>Today</button>
            </div>
          </div>
        </div>
  </div>
    </div>
  )
}

export default SimpleCalendar
