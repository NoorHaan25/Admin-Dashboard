import React, { useContext } from 'react'
import styles from "./Theme.module.css";
import { ThemeContext } from '../ThemeContext';
function Theme() {
  const { darkTheme, setDarkTheme } = useContext(ThemeContext);
  return (
    <>
      <img
        src={require(`../../image/icons/${darkTheme ? 'sun-dark' : 'moon-light'}.png`)}
        alt="theme-icon"
        className={styles["icon"]}
        onClick={() => {
          setDarkTheme(!darkTheme);
        }}
      />
    </>
  )
}

export default Theme;