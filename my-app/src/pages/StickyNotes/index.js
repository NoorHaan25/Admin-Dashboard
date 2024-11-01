import React, { useContext, useEffect, useRef, useState } from 'react';
import styles from "./StickyNotes.module.css";
import Col from 'react-bootstrap/esm/Col'
import Row from 'react-bootstrap/esm/Row'
import Container from 'react-bootstrap/esm/Container';
import { ThemeContext } from '../../components/ThemeContext';
import { addNote, deleteNote, getAllNotes } from '../../services/api';
function  StickyNotes() {
  const { darkTheme } = useContext(ThemeContext);
  const extractRefs = useRef([]);
  let [notes , setNotes] = useState([]);
  let [day] = useState(new Date().getDate());
  let [month] = useState(new Date().getMonth()); 
  let [year] = useState(new Date().getFullYear());
  const months=[
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
    "December"
  ];
  const extractColor = (index) => {
    if (extractRefs.current[index]) {
      console.log(window.getComputedStyle(extractRefs.current[index]).color);
      const spanColor = window.getComputedStyle(extractRefs.current[index]).color;
      setNotes((prevNotes) =>{ 
        return[
        ...prevNotes,
        { color: spanColor , date: `${months[month]} , ${day} ${year}`}
      ]});
    }
  };
  const handleContentChange = (index, value) => {
    const updatedNotes = [...notes];
    updatedNotes[index].content = value;
    setNotes(updatedNotes);
  };
  const handleSaveNote = (index) => {
    const noteToSave = notes[index];
    if (noteToSave.content.trim() !== '') {
      addNote(noteToSave)
        .then((res) => {
          console.log('Note saved:', res);
        })
        .catch((err) => {
          console.error('Error saving note:', err);
        });
    }
  };
  const getAll = async()=>{
    try{
      const response = await getAllNotes();
      setNotes(response.data);
    }catch(err){
      console.log(err);
    }
  }
  const deleteSelectedNote = (id)=>{
    console.log(`deleteHabit ${id}`);
    deleteNote(id).then((res)=>{
      if(res.status == 200 || res.status == 201){
        getAll();
      }
    })
    
  }
  useEffect(() => {
    getAll();
  }, []);
  return (
    <section className={styles['StickyNotes']}>
    <Container>
      <div className={styles['heading']}>
        <h1 className={`${darkTheme ? 'darkTextColor' : 'lightTextColor'}`}>Sticky Notes</h1>
      </div>
      <Row>
        <Col lg={1}>
        <div className={styles["list-of-color"]}>
        {Array(5).fill().map((_, index) => (
          <span
            key={index}
            ref={(el) => (extractRefs.current[index] = el)} 
            onClick={() => extractColor(index)}
            style={{
              color:index === 0 ? '#ffc872' : 
                    index === 1 ? '#ff9b72' : 
                    index === 2 ? '#b693fd' : 
                    index === 3 ? '#00d4fe' : 
                    '#e6ef91'
            }} 
          ></span>
        ))}
        </div>
        </Col>
        <Col lg={11}>
          <Row>
          {notes.map((note, index) => (
            <Col lg={3} key={index}>
              <div className={`${styles['box-note']}`} style={{ backgroundColor: note.color }}>
                <p className={styles['input-note']} contentEditable={'true'}  onBlur={(e) => {
                  handleContentChange(index, e.target.innerText);
                  handleSaveNote(index);
                }}>{note.content}</p>
                <img className={styles['delete']} src={require('../../image/icons/delete.png')} alt='delete' onClick={()=>{deleteSelectedNote(note.id)}}/>
                <div className={styles['date-note']}>{note.date}</div>
              </div>
            </Col>
          ))}
          </Row>
        </Col>
      </Row>
    </Container>
    </section>
  )
}
export default StickyNotes;