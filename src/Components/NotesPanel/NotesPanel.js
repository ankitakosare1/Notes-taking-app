import React from 'react'
import './NotesPanelStyle.css'

const NotesPanel = ({ notes, newNote, onChange, onAddNote, activeGroup, onBack }) => {

  const initials = activeGroup?.name?.split(' ').slice(0, 2).map(w => w[0]).join('').toUpperCase();

  return (
    <div className='notesPanel'>
      <div className='header'>
        {/* Mobile View */}
        <button className='backBtn' onClick={onBack}>←</button>

        <div className='notesProfilePic' style={{ backgroundColor: activeGroup.color }}>{initials}</div>
        <div className='notesGroupname'>{activeGroup.name}</div>
      </div>

      <div className='notesList'>
        {
          notes.map((note, i) => (
            <div key={i} className='note'>
              <p>{note.text}</p>
              <small>{note.date}<span className="dot"> &nbsp;&bull;&nbsp; </span>{note.time}</small>
            </div>
          ))
        }
      </div>
      <div className='inputBox'>
        <textarea placeholder='Enter your text here...'
          value={newNote}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              if (newNote.trim()) {
                onAddNote();
              }
            }
          }} ></textarea>
        <button className={`sendBtn ${newNote.trim() ? 'active' : ''}`}
          onClick={onAddNote} disabled={!newNote}>➤</button>
      </div>
    </div>
  )
}

export default NotesPanel
