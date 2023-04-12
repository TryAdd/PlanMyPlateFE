import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import NoteForm from './NoteForm';



export default function CalendarPage() {
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState([]);

  const handleDateClick = (value) => {
    setDate(value);
  };

  const addNote = (newNote) => {
    setNotes([...notes, newNote]);
  };

  return (
    <div>
      <h1>My Calendar</h1>
      <Calendar value={date} onChange={handleDateClick} />
      <NoteForm addNote={addNote}/>
    </div>
  );
}
