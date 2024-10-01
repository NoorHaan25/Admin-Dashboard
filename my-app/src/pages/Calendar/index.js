import React, { useState, useEffect, useContext } from 'react';
import styles from "./Calendar.module.css";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import { ThemeContext } from '../../components/ThemeContext';
function Calendar() {
  const { darkTheme } = useContext(ThemeContext);
  const [calendarDate, setCalendarDate] = useState('');
  const [days, setDays] = useState([]);
  let [month, setMonth] = useState(new Date().getMonth());
  let [year, setYear] = useState(new Date().getFullYear());
  const [inputDate, setinputDate] = useState("");
  const [openEvent, setOpenEvent] = useState(false);
  let [eventName, setEventName] = useState("");
  let [eventTimeFrom, setEventTimeFrom] = useState("");
  let [eventTimeTo, setEventTimeTo] = useState("");
  let [activeDate, setActiveDate] = useState('');
  const [dateEvent, setDateEvent] = useState({
    day: '',
    fullDate: '',
  });
  let [events, setEvents] = useState([]);
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
  let eventsArr = JSON.parse(localStorage.getItem('calendarEvents')) || [];
  function initCalendar() {
    const firstDayCurrentMonth = new Date(year, month, 1);
    const lastDayCurrentMonth = new Date(year, month + 1, 0);
    const prevMonthLastDay = new Date(year, month, 0);
    const prevMonthLastDayNumber = prevMonthLastDay.getDate();
    const lastDayCurrentMonthNumber = lastDayCurrentMonth.getDate();
    const firstDayCurrentMonthNumber = firstDayCurrentMonth.getDay();
    const nextDay = 7 - lastDayCurrentMonth.getDay() - 1;
    let generatedDays = [];
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

      eventsArr.forEach((eventObj) => {
        if (
          eventObj.day === i &&
          eventObj.month == month + 1 &&
          eventObj.year == year &&
          eventObj.events.length > 0
        ) {
          event = true;
        }
      })
      let isActive = dateKey === activeDate;
      if (
        i === new Date().getDate() &&
        year === new Date().getFullYear() &&
        month === new Date().getMonth()
      ) {
        if (event) {
          generatedDays.push(<span className={`${styles['day']} ${styles.today} ${isActive ? styles['active'] : ''} ${styles.event} ${darkTheme ? "darkBorder" : "lightBorder"}`} key={`current-${i}`} onClick={() => handleDateClick(i)}>{i}</span>);
        } else {
          generatedDays.push(<span className={`${styles['day']} ${styles.today} ${isActive ? styles['active'] : ''} ${darkTheme ? "darkBorder" : "lightBorder"}`} key={`current-${i}`} onClick={() => handleDateClick(i)}>{i}</span>);
        }
      } else {
        if (event) {
          generatedDays.push(<span className={`${styles['day']} ${styles.event}  ${isActive ? styles['active'] : ''} ${darkTheme ? "darkBorder" : "lightBorder"}`} onClick={() => handleDateClick(i)} key={`current-${i}`}>{i}</span>);
        }
        else {
          generatedDays.push(<span className={`${styles['day']} ${isActive ? styles['active'] : ''} ${darkTheme ? "darkBorder" : "lightBorder"}`} onClick={() => handleDateClick(i)} key={`current-${i}`}>{i}</span>);
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
  function todayButton() {
    const today = new Date();
    const currentmonth = today.getMonth();
    const currentyear = today.getFullYear();
    setMonth(currentmonth);
    setYear(currentyear);
  };
  function handleInputDate(e) {
    let value = e.target.value.replace(/[^0-9/]/g, "");
    // console.log('handleInputDate' , value);
    if (value.length === 2) {
      value += "/";
    }
    if (value.length > 7) {
      value = value.slice(0, 7);
    }
    if (value.length === 3 && e.target.value.length < inputDate.length) {
      value = value.slice(0, 2);
    }
    setinputDate(value);
  }
  function buttonEvent() {
    let dateArr = inputDate.split("/");
    if (dateArr.length === 2) {
      if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
        setMonth(dateArr[0] - 1)
        setYear(dateArr[1])
      }
    }
  }
  function handleInputEventsFrom(e) {
    let value = e.target.value.replace(/[^0-9:]/g, "");
    if (value.length === 2) {
      value += ":";
    }
    if (value.length > 5) {
      value = value.slice(0, 5);
    }
    if (value.length === 3 && e.target.value.length < eventTimeFrom.length) {
      value = value.slice(0, 2);
    }
    setEventTimeFrom(value)
  }
  function handleInputEventsTo(e) {
    let value = e.target.value.replace(/[^0-9:]/g, "");
    if (value.length === 2) {
      value += ":";
    }
    if (value.length > 5) {
      value = value.slice(0, 5);
    }
    if (value.length === 3 && e.target.value.length < eventTimeTo.length) {
      value = value.slice(0, 2);
    }
    setEventTimeTo(value)
  }
  function handleDateClick(day) {
    const dateKey = `${year}-${month + 1}-${day}`;
    const selectedDate = new Date(year, month, day);
    const dayOfWeek = selectedDate.toLocaleString('en-US', { weekday: 'short' });
    const formattedDate = `${day} ${months[month]} ${year}`;
    setDateEvent({
      day: dayOfWeek,
      fullDate: formattedDate,
    });
    setActiveDate(dateKey);

    const foundEvents = eventsArr.find((event) =>
      event.day === day && event.month === month + 1 && event.year === year
    );
    setEvents(foundEvents ? foundEvents.events : []);
  };
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
    setDateEvent({
      day: nextMonthDate.toLocaleString('en-US', { weekday: 'short' }),
      fullDate: `${day} ${months[nextMonthDate.getMonth()]} ${nextMonthDate.getFullYear()}`,
    });
    eventsArr.forEach((event) => {
      if (event.day == day && event.month == month + 1 && event.year == year) {
        console.log(event.events);
        setEvents(event.events);
      }
    })
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
    setDateEvent({
      day: prevMonthDate.toLocaleString('en-US', { weekday: 'short' }),
      fullDate: `${day} ${months[prevMonthDate.getMonth()]} ${prevMonthDate.getFullYear()}`,
    });
    eventsArr.forEach((event) => {
      if (event.day == day && event.month == month + 1 && event.year == year) {
        console.log(event.events);
        setEvents(event.events);
      }
    })
  }
  function addEventSubmit(e) {
    if (eventName == "" && eventTimeFrom == "" && eventTimeTo == "") {
      alert('addEventSubmit');
      return;
    }
    const timeFromArr = eventTimeFrom.split(':');
    const timeToArr = eventTimeTo.split(':');
    if (
      timeFromArr.length != 2 ||
      timeToArr.length != 2 ||
      timeFromArr[0] > 23 ||
      timeFromArr[1] > 59 ||
      timeToArr[0] > 23 ||
      timeToArr[1] > 59) {
      alert('invalid time forma');
      return;
    }
    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);
    const newEvent = {
      id: Date.now(),
      title: eventName,
      time: `${timeFrom} - ${timeTo}`
    };
    const existingEventIndex = eventsArr.findIndex(eventObj =>
      eventObj.day === parseInt(activeDate.split('-')[2]) &&
      eventObj.month === month + 1 &&
      eventObj.year === year
    );
    if (existingEventIndex !== -1) {
      eventsArr[existingEventIndex].events.push(newEvent);
    } else {
      // Add new event for the selected day
      eventsArr.push({
        day: parseInt(activeDate.split('-')[2]),
        month: month + 1,
        year: year,
        events: [newEvent],
      });
    }
    localStorage.setItem('calendarEvents', JSON.stringify(eventsArr));
    setEvents([...events, newEvent]);
    setEventName("");
    setEventTimeFrom("");
    setEventTimeTo("");
    setOpenEvent(false); // Close the event input form
    alert('Event added successfully');
  }
  function convertTime(time) {
    let timeArr = time.split(":");
    console.log('converting time', timeArr);
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    console.log('converting time', timeArr, timeHour, timeMin);
    let timeFormat = timeHour >= 12 ? "PM" : "AM";
    timeHour = timeHour % 12 || 12;
    time = timeHour + ":" + timeMin + " " + timeFormat;
    return time;
  }
  function deleteEvent(eventId) {
    const activeDay = parseInt(activeDate.split('-')[2]);
    const activeMonth = month + 1;
    const activeYear = year;
  
    const eventIndex = eventsArr.findIndex(eventObj =>
      eventObj.day === activeDay &&
      eventObj.month === activeMonth &&
      eventObj.year === activeYear
    );
  
    if (eventIndex !== -1) {
      eventsArr[eventIndex].events = eventsArr[eventIndex].events.filter(event => event.id !== eventId);
  
      if (eventsArr[eventIndex].events.length === 0) {
        eventsArr.splice(eventIndex, 1);
      }
  
      localStorage.setItem('calendarEvents', JSON.stringify(eventsArr));
  
      const updatedEvents = eventsArr.find(eventObj =>
        eventObj.day === activeDay &&
        eventObj.month === activeMonth &&
        eventObj.year === activeYear
      )?.events || [];
      setEvents(updatedEvents);
  
      alert('Event deleted successfully');
    } else {
      alert('Event not found');
    }
  }
  useEffect(() => {
    initCalendar()
  }, [year, month, activeDate])
  return (
    <div className={styles['wrapper-calendar']}>
      <Row>
        <Col lg={7}>
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
              <div className={styles["event-today"]}>
                <div className={styles["input-event"]}>
                  <input
                    type="text"
                    placeholder="mm/yyyy"
                    className={`${styles["input-date"]} ${darkTheme ? "darkTextColor" : "lightTextColor"}`}
                    value={inputDate}
                    onChange={(e) => {
                      setinputDate(e.target.value);
                      handleInputDate(e);
                    }} />
                </div>
                <div className={styles["button-event"]}>
                  <button onClick={() => { buttonEvent() }}>Go</button>
                </div>
              </div>
              <div className={styles["today-button"]}>
                <button onClick={() => { todayButton() }}>Today</button>
              </div>
            </div>
          </div>
        </Col>
        <Col lg={5}>
          <div className={styles["wrapper-events"]}>
            <div className={styles["today-date"]}>
              <div className={`${styles["event-day"]} ${darkTheme ? 'darkTextColor' : 'lightTextColor'}`}>{dateEvent.day || "Wed"}</div>
              <div className={styles["event-date"]}>{dateEvent.fullDate || "25 August 2024"}</div>
            </div>
            <div className={styles["events"]}>
              {events && events.length > 0 ? (
                events.map((event , index) => (
                    <div className={styles["event"]} key={index}>
                      <div>
                        <div className={styles["title"]}>
                          <h3 className={styles["event-title"]}>{event.title}</h3>
                        </div>
                        <div className={styles["event-time"]}>{event.time}</div>
                      </div>
                      <div className={[styles["delete"]]} onClick={()=>{deleteEvent(event.id)}}>
                        <img src={require(`../../image/icons/bin-${darkTheme ? 'dark' : 'light'}.png`)} alt='bin' />
                      </div>
                    </div>
                ))
              ): (
                <div className={styles["no-event"]}>
                  <span>No Event</span>
                </div>
              )}
            </div>
            <div className={`${styles["add-event-wrapper"]} ${openEvent && styles["active"]}`}>
              <div className={styles["add-event-header"]}>
                <span className={styles["title"]}>Add Event</span>
                <span className={styles["close"]} onClick={() => { setOpenEvent(false) }}>x</span>
              </div>
              <div className={styles["add-event-body"]}>
                <div className={styles["add-event-input"]}>
                  <input
                    type="text"
                    placeholder="Event Name"
                    className="event-name"
                    value={eventName}
                    onChange={(e) => {
                      setEventName(e.target.value)
                    }}
                  />
                </div>
                <div className={styles["add-event-input"]}>
                  <input
                    type="text"
                    placeholder="Event Time From"
                    className={styles["event-time-from"]}
                    value={eventTimeFrom}
                    onChange={(e) => {
                      setEventTimeFrom(e.target.value)
                      handleInputEventsFrom(e)
                    }}
                  />
                </div>
                <div className={styles["add-event-input"]}>
                  <input
                    type="text"
                    placeholder="Event Time To"
                    className={styles["event-time-to"]}
                    value={eventTimeTo}
                    onChange={(e) => {
                      setEventTimeTo(e.target.value)
                      handleInputEventsTo(e)
                    }}
                  />
                </div>
              </div>
              <div className={styles["add-event-footer"]}>
                <button className={styles["add-event-btn"]} onClick={(e) => { addEventSubmit(e) }}>Add Event</button>
              </div>
            </div>
            <button className={`${styles["add-event"]}`} onClick={() => { setOpenEvent(true) }}>
              <span className={styles["plus"]}>+</span>
            </button>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Calendar
