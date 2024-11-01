import React, {useContext } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import styles from './FAQ.module.css'
import { ThemeContext } from '../../components/ThemeContext';
import Container from 'react-bootstrap/esm/Container';
function FAQ() {
  const { darkTheme } = useContext(ThemeContext);
  return (
    <section>
      <Container>
        <div className={styles['heading']}>
        <h1 className={`${darkTheme ? 'darkTextColor' : 'lightTextColor'}`}>FAQS</h1>
        </div>
        <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0" className={styles['accordion-item']}>
          <Accordion.Header className= {styles['button-accordion']}>What are your daily habits?</Accordion.Header>
          <Accordion.Body className={`${darkTheme ? 'dark' : 'text'} ${styles['button-accordion']}`}>
          Daily habits are routines or practices that individuals perform regularly, often daily. They can significantly impact overall well-being and productivity.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="2" className={styles['accordion-item']}>
          <Accordion.Header>How can I identify the daily habits I want to improve ?</Accordion.Header>
          <Accordion.Body className={`${darkTheme ? 'dark' : 'text'}`}>
          Begin with small, manageable changes and gradually build upon them. Consistency is key, so aim to practice the new habit every day for at least 21 days.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="3" className={styles['accordion-item']}>
          <Accordion.Header>What are some daily habits I should avoid ?</Accordion.Header>
          <Accordion.Body className={`${darkTheme ? 'dark' : 'text'}`}>
          Some common negative habits include excessive screen time, procrastination, and unhealthy eating. It's important to be mindful of these and seek healthier alternatives.
          </Accordion.Body>
        </Accordion.Item>
        <Accordion.Item eventKey="4" className={styles['accordion-item']}>
        <Accordion.Header>How do I stay motivated to change my habits ?</Accordion.Header>
        <Accordion.Body className={`${darkTheme ? 'dark' : 'text'}`}>
        Find a support system, set achievable goals, and reward yourself for progress. Remind yourself of the benefits you’ll gain from making these changes.
        </Accordion.Body>
      </Accordion.Item>
        </Accordion>
      </Container>
      
    </section>
    
  )
}

export default FAQ