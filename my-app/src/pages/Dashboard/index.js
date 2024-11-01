import React, { useContext, useState } from "react";
import styles from "./Dashboard.module.css";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import BarChart from "../../components/BarChart";
import LineChart from '../../components/LineChart';
import { ThemeContext } from "../../components/ThemeContext";
import PieChart from "../../components/PieChart";
import SimpleCalendar from "../../components/SimpleCalendar";
import TaskManagement from "../TaskManagement";
import { Link } from "react-router-dom";
function Dashboard() {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <>
      <div className={styles["dashboard"]}>
        <Container>
          <div className={styles["heading"]}>
            <div className={styles["img"]}>
              <img
                src={require("../../image/icons/home-page.png")}
                alt="home-icon"
              />
            </div>
            <h1 className={`${darkTheme ? "darkText" : "lightText"}`}>Dashboard</h1>
          </div>
        </Container>
      </div>
      <section>
        <Container>
          <Row>
            <Col lg={4}>
              <div className={`${styles["card"]} ${styles["pink"]}`}>
                <div className={styles["text-card"]}>
                  <div className={styles['info-card']}>
                    <h4>Weekly Habits Progress</h4>
                    <img src={require('../../image/icons/progress.png')} alt="icon-progress" />
                  </div>
                  <h2>80%</h2>
                  <p>Improved by 15% from last week</p>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className={`${styles["card"]} ${styles["blue"]}`}>
                <div className={styles["text-card"]}>
                  <div className={styles['info-card']}>
                    <h4>Monthly Habit Success Rate</h4>
                    <img src={require('../../image/icons/bookmark.png')} alt="icon-bookmark" />
                  </div>
                  <h2>80%</h2>
                  <p>Increased by 10% compared to last month</p>
                </div>
              </div>
            </Col>
            <Col lg={4}>
              <div className={`${styles["card"]} ${styles["green"]}`}>
                <div className={styles["text-card"]}>
                  <div className={styles['info-card']}>
                    <h4>Habit Streak</h4>
                    <img src={require('../../image/icons/diamond.png')} alt="icon-diamond" />
                  </div>
                  <h2>21 Days</h2>
                  <p>You're on a 21-day streak!</p>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section className={styles["bar-dashboard"]}>
        <Container>
          <Row>
            <Col lg={4}> <PieChart translateX={-150} bottom={250}/></Col>
            <Col lg={8}> <BarChart /></Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <Row className="align-items-center">
            <Col lg={6}> <SimpleCalendar /></Col>
            <Col lg={6}>
              <div className={styles['wrapper-images']}>
                <div className={styles['card-image']}>
                  <img src={require('../../image/reading.jpg')} alt="reading" />
                </div>
                <div className={styles['card-image']}>
                  <img src={require('../../image/drinking-water.jpeg')} alt="water-glass" />
                </div>
                <div className={styles['card-image']}>
                  <img src={require('../../image/sunrise.jpg')} alt="sunrise" />
                </div>
                <div className={styles['card-image']}>
                  <img src={require('../../image/heart-healthy-diet.jpg')} alt="healthy" />
                </div>
              </div>
              <div className={styles['text-images']}>
                <p className={`${darkTheme ? "darkText" : "lightText"}`}> Daily habits are the foundation upon which our future is built. Every small step we take repeatedly contributes to shaping our lives in ways that are not immediately visible but become powerful over time. Whether the habit is related to health, productivity, or personal growth, our commitment to improving ourselves day by day brings us closer to our goals and dreams.</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <section>
        <Container>
          <TaskManagement/>
        </Container>
      </section>
      <section>
        <Container>
          <Row className="align-items-center">
            <Col lg={7}>
              <div className={styles['wrapper-line-chart']}><LineChart/></div>
            </Col>
            <Col lg={4}>
              <div className={`${styles['daily-tasks']} ${darkTheme ? "dark" : "light"}`}>
                <h2>What do you need to do today?</h2>
                  <div className={styles['lottie-animation']}>
                    <dotlottie-player src="https://lottie.host/246b5554-208f-489a-b631-eb6efd98856a/YIbFzBMFx2.json" background="transparent" speed="1" style={{width: "500px", height: "400px"}} loop autoplay></dotlottie-player>
                  </div>
                <div className={styles['wrapper-link']}><Link to={'todoList'}>Start your tasks now!</Link></div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      
    </>
  );
}

export default Dashboard;
