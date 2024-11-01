import React, { useContext, useState } from 'react'
import styles from "./Sidebar.module.css";
import { Link, useLocation } from 'react-router-dom';
import { ThemeContext } from "../ThemeContext";
function Sidebar({openBars , setOpenbars ,  openBarsSmall, setOpenbarsSmall}) {
  const { pathname } = useLocation();
  const { darkTheme } = useContext(ThemeContext);
  const [linksOpen, setLinksOpen] = useState({});
  const toggleItem = (pathName) => {
    setLinksOpen(prevState => ({
      ...prevState,
      [pathName]: !prevState[pathName]
    }));
  };
  
  const itemOne = [
    {
      text: 'Dashboard',
      pathName: '/',
      icon: require(`../../image/icons/home-${darkTheme ? 'dark' : 'light'}.png`)
    },
    {
      text: 'Daily Habits',
      pathName: 'TaskManagement',
      icon: require(`../../image/icons/Habits-${darkTheme ? 'dark' : 'light'}.png`)
    },
    {
      text: 'Sticky Notes',
      pathName: 'StickyNotes',
      icon: require(`../../image/icons/stickynote-${darkTheme ? 'dark' : 'light'}.png`)
    },
    {
      text: 'todoList',
      pathName: 'todoList',
      icon: require(`../../image/icons/todo-${darkTheme ? 'dark' : 'light'}.png`)
    }
  ]
  const itemTwo = [
    {
      text: 'Create New Habits',
      pathName: 'form',
      icon: require(`../../image/icons/user-${darkTheme ? 'dark' : 'light'}.png`)
    },
    {
      text: 'Calendar',
      pathName: 'calendar',
      icon: require(`../../image/icons/calendar-${darkTheme ? 'dark' : 'light'}.png`)
    },
    {
      text: 'FAQ Page',
      pathName: 'faq',
      icon: require(`../../image/icons/information-${darkTheme ? 'dark' : 'light'}.png`)
    }
  ]
  const itemThree = [
    {
      text: 'Bar Chart',
      pathName: 'bar',
      icon: require(`../../image/icons/bar-chart-${darkTheme ? 'dark' : 'light'}.png`),
    },
    {
      text: 'Pie Chart',
      pathName: 'pie',
      icon: require(`../../image/icons/pie-${darkTheme ? 'dark' : 'light'}.png`)
    },
    {
      text: 'Line Chart',
      pathName: 'line',
      icon: require(`../../image/icons/time-${darkTheme ? 'dark' : 'light'}.png`)
    }
  ]
  return (
    <aside className={`${darkTheme ? "dark" : "light"} `} style={{ "left": openBarsSmall && window.innerWidth < 576  && ('0')}}>
      <ul className={`${styles['section-items']} ${darkTheme ? "darkBorderBottom" : "lightBorderBottom"}`}>
        {itemOne.map((item) => {
          const isActive = item.pathName === (pathname !== '/' ? pathname.slice(1) : pathname);
          return (
            <li key={item.pathName} style={{ "margin": !openBars && window.innerWidth > 576  && ('10px 10px 20px 10px'), backgroundColor: isActive ? darkTheme ? "#424242" : "#e0e0e0" : null }}>
              <Link to={item.pathName} className={`${styles["nav-link"]} ${styles["big-screen"]}`} style={{ justifyContent: !openBars && ('center') }}>
                <img src={item.icon} alt="bell-icon" className={styles["icon"]} />
                <span style={{ display: openBars ? 'inline-block' : 'none' }} className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>{item.text}</span>
              </Link>
              <Link to={item.pathName} className={`${styles["nav-link"]} ${styles["small-screen"]}`}>
                <img src={item.icon} alt="bell-icon" className={styles["icon"]} />
                <span className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>{item.text}</span>
              </Link>
            </li>
          )
        })}
      </ul>
      <ul className={`${styles['section-items']} ${darkTheme ? "darkBorderBottom" : "lightBorderBottom"}`}>
        {itemTwo.map((item) => {
          const isActive = item.pathName === (pathname !== '/' ? pathname.slice(1) : pathname);
          return (
          <li key={item.pathName} style={{ "margin": !openBars && window.innerWidth > 576  && ('10px 10px 20px 10px'), backgroundColor: isActive ? darkTheme ? "#424242" : "#e0e0e0" : null }}>
          <Link to={item.pathName} className={`${styles["nav-link"]} ${styles["big-screen"]}`} style={{ justifyContent: !openBars && ('center') }}>
                <img src={item.icon} alt="bell-icon" className={styles["icon"]} />
                <span style={{ display: !openBars ? 'none' : 'inline-block' }} className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>{item.text}</span>
              </Link>
              <Link to={item.pathName} className={`${styles["nav-link"]} ${styles["small-screen"]}`} >
                <img src={item.icon} alt="bell-icon" className={styles["icon"]} />
                <span className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>{item.text}</span>
              </Link>
            </li>
          )
        })}
      </ul>
      <ul className={`${styles['section-items']}`}>
        {itemThree.map((item) => {
          const isActive = item.pathName === (pathname !== '/' ? pathname.slice(1) : pathname);
          return (
            <li key={item.pathName} style={{ "margin": !openBars && window.innerWidth > 576  && ('10px 10px 20px 10px'), backgroundColor: isActive ? darkTheme ? "#424242" : "#e0e0e0" : null }}>
            <Link to={item.pathName} className={`${styles["nav-link"]} ${styles["big-screen"]}`} style={{ justifyContent: !openBars && ('center') }}>
                <img src={item.icon} alt="bell-icon" className={styles["icon"]} />
                <span style={{ display: !openBars ? 'none' : 'inline-block' }} className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>{item.text}</span>
              </Link>
              <Link to={item.pathName} className={`${styles["nav-link"]} ${styles["small-screen"]}`} >
                <img src={item.icon} alt="bell-icon" className={styles["icon"]} />
                <span className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}>{item.text}</span>
              </Link>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}

export default Sidebar
