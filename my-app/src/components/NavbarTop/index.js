import styles from "./NavbarTop.module.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LogoMini from "../../logo-mini.svg";
import Logo from "../../logo.svg";
import { Link } from "react-router-dom";
import { useContext} from "react";
import Theme from "../Theme";
import { ThemeContext } from "../ThemeContext";
function NavbarTop({openBars , setOpenbars , openBarsSmall, setOpenbarsSmall}) {
  const { darkTheme } = useContext(ThemeContext);
  console.log('darkTheme', darkTheme);
  return (
    <Navbar expand="lg" className={`${styles["navbar"]} ${darkTheme ? "dark" : "light"}`}>

          <Row style={{ width: "100%" }} className="align-items-center">
            <Col lg={6} md={8} sm={6} xs={6}>
              <a href="#home" className={styles["brand"]}>
                <img
                  src={openBars ? Logo : LogoMini}
                  className={`${styles["logo-big-screen"]} ${openBars ? styles["logo"] : styles["logoMini"]}`}
                  alt="logo"
                />
                <img
                  src={LogoMini}
                  className={`${styles["logoMini-small-screen"]}`}
                  alt="logo"
                />
              </a>
              <div className={styles["barsIcon"]} onClick={()=>{setOpenbars(!openBars); setOpenbarsSmall(!openBarsSmall)}}>
                <img src={require(`../../image/icons/menu-${darkTheme ? 'dark' : 'light'}.png`)} alt="settings-icon" className={styles["icon"]}/>
              </div>
              <div className={`${styles["search-input"]} `} >
                <img src={require(`../../image/icons/search-${darkTheme ? 'dark' : 'light'}.png`)} alt="search-icon" className={styles["icon"]}/>
                <input type="search" placeholder="Search Projects" className={`${darkTheme ? "darkTextColor" : "lightTextColor"}`}/>
              </div>
            </Col>
            <Col lg={6} md={4} sm={6} xs={6}>
              <div className="d-flex justify-content-end" >
                <Link  href="#home" className={styles["nav-link"]} >
                  <Theme/>
                  </Link>
                {/*<Link href="#link" className={styles["nav-link"]}>
                  <img src={require(`../../image/icons/settings-${darkTheme ? 'dark' : 'light'}.png`)} alt="settings-icon" className={styles["icon"]}/>
                </Link>*/}
                <Link href="#link" className={styles["nav-link"]}>
                  <img src={require(`../../image/icons/notification-${darkTheme ? 'dark' : 'light'}.png`)} alt="bell-icon" className={styles["icon"]}/>
                </Link>
                <Link href="#link" className={styles["nav-link"]}>
                  <img src={require(`../../image/icons/user-${darkTheme ? 'dark' : 'light'}.png`)} alt="user-icon" className={styles["icon"]}/>
                </Link>
              </div>
            </Col>
          </Row>
  
    </Navbar>
  );
}

export default NavbarTop;
