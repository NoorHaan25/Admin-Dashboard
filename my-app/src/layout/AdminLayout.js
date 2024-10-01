import Row from "react-bootstrap/esm/Row";
import NavbarTop from "../components/NavbarTop";
import Sidebar from "../components/Sidebar";
import Col from "react-bootstrap/esm/Col";
import { Outlet } from 'react-router';
import Container from "react-bootstrap/esm/Container";
import { ThemeContext, ThemeProvider } from "../components/ThemeContext";
import { useContext, useState } from "react";

function AdminLayout() {
  const [openBars, setOpenbars] = useState(false);
  const [openBarsSmall, setOpenbarsSmall] = useState(false);
  return (
    <ThemeProvider>
      <LayoutContent openBars={openBars} setOpenbars={setOpenbars} openBarsSmall = {openBarsSmall} setOpenbarsSmall={setOpenbarsSmall} />
    </ThemeProvider>
  );
}

function LayoutContent({ openBars, setOpenbars , openBarsSmall, setOpenbarsSmall}) {
  const { darkTheme } = useContext(ThemeContext);
  // console.log('dark theme: ', darkTheme);

  return (
    <Container fluid>
      <Row>
        <Col lg={12} style={{ padding: '0' }}><NavbarTop openBars={openBars} setOpenbars={setOpenbars} openBarsSmall={openBarsSmall} setOpenbarsSmall={setOpenbarsSmall}/></Col>
      </Row>
      <Row style={{backgroundColor:darkTheme ? "#171717" : "#e2e1dc" , height:"100%"}}>
        <Col lg={openBars ? 2 : 1} md ={openBars ? 3 : 2} sm={openBars ? 3 : 2}  style={{ padding: '0', transition: ' all 0.2s linear ' }}><Sidebar openBars={openBars} setOpenbars={setOpenbars} openBarsSmall={openBarsSmall} setOpenbarsSmall={setOpenbarsSmall}/></Col>
        <Col lg={openBars ? 10 : 11} md ={openBars ? 9 : 10} sm={openBars ? 9 : 10}  style={{ padding: '0' }}><Outlet/></Col>
      </Row>
    </Container>
  );
}

export default AdminLayout;