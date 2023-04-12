import React, { useState } from 'react';

export default function NoteForm(props) {
  const [note, setNote] = useState({ text: '', date: '' });

  const handleChange = (event) => {
    const attributeToChange = event.target.name;
    const newValue = event.target.value;

    let updatedNote = { ...note };
    updatedNote[attributeToChange] = newValue;

    setNote(updatedNote);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    props.addNote(note);
    setNote({ text: '', date: '' });
  };

  return (
    <div>
      <h2>Add Note</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Note:</label>
          <input type="text" name="text" value={note.text} onChange={handleChange} />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" name="date" value={note.date} onChange={handleChange} />
        </div>
        <button type="submit">Add Note</button>
      </form>
    </div>
  );
}
