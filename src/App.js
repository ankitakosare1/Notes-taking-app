import { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Components/Sidebar/Sidebar';
import LandingPage from './Components/LandingPage/LandingPage';
import NotesPanel from './Components/NotesPanel/NotesPanel';
import CreateGroupModal from './Components/CreateGroupModal/CreateGroupModal';

function App() {
  const [groups, setGroups] = useState(() => JSON.parse(localStorage.getItem('groups')) || []);
  const [showPopup, setShowPopup] = useState(false);
  const [activeGroup, setActiveGroup] = useState(null);
  const [notes, setNotes] = useState(() => JSON.parse(localStorage.getItem('notes')) || {});
  const [newNote, setNewNote] = useState('');
  const [groupName, setGroupName] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    localStorage.setItem('groups', JSON.stringify(groups));
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [groups, notes])


  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleCreateGroup = () => {
    const trimmedGroupName = groupName.trim();
    const words = trimmedGroupName.split(' ');

    if (trimmedGroupName === '') {
      setError('Group name cannot be empty');
      return;
    }

    if (words.length < 1) {
      setError('Group name must contain at least one word');
      return;
    }

    if (groups.some((g) => g.name === trimmedGroupName)) {
      setError('Group name already exists');
      return;
    }

    if (!selectedColor) {
      setError('Please select a color');
      return;
    }

    const newGroup = {
      name: trimmedGroupName,
      color: selectedColor
    }

    setGroups([...groups, newGroup]);
    setNotes({ ...notes, [trimmedGroupName]: [] });
    setGroupName('');
    setSelectedColor('');
    setError('');
    setShowPopup(false);
  }

  return (
    <div className="App">
      {/* Mobile View */}
      {
        isMobile ? (
          <>
            {
              !activeGroup ? (
                <Sidebar groups={groups}
                  activeGroup={activeGroup}
                  onGroupClick={(grp) => setActiveGroup(grp)}
                  onClickAddButton={() => setShowPopup(true)}
                />
              ) : (
                <NotesPanel
                  notes={notes[activeGroup.name] || []}
                  newNote={newNote}
                  onChange={(e) => setNewNote(e.target.value)}
                  onAddNote={() => {
                    const now = new Date();

                    const day = now.getDate();
                    const month = now.toLocaleString('en-US', { month: 'short' });
                    const year = now.getFullYear();

                    const hours = now.getHours();
                    const minutes = now.getMinutes();
                    const ampm = hours >= 12 ? 'PM' : 'AM';
                    const formattedHour = hours % 12 || 12;
                    const formattedMinute = minutes.toString().padStart(2, '0');

                    const date = `${day} ${month} ${year}`; // 4 Jul 2025
                    const time = `${formattedHour}:${formattedMinute} ${ampm}`; // 12:48 PM

                    const noteObj = {
                      text: newNote,
                      date: date,
                      time: time
                    };

                    const updated = [...(notes[activeGroup.name] || []), noteObj];
                    setNotes({ ...notes, [activeGroup.name]: updated });
                    setNewNote('');
                  }}
                  activeGroup={activeGroup}
                  onBack={() => setActiveGroup(null)}
                />
              )
            }
          </>
        ) : (
          // Desktop View
          <>
            <Sidebar groups={groups}
              activeGroup={activeGroup}
              onGroupClick={(grp) => setActiveGroup(grp)}
              onClickAddButton={() => setShowPopup(true)}
            />

            <div className='mainPanel'>
              {
                !activeGroup ? (
                  <LandingPage />
                ) :
                  (
                    <NotesPanel
                      notes={notes[activeGroup.name] || []}
                      newNote={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      onAddNote={() => {
                        const now = new Date();

                        const day = now.getDate();
                        const month = now.toLocaleString('en-US', { month: 'short' });
                        const year = now.getFullYear();

                        const hours = now.getHours();
                        const minutes = now.getMinutes();
                        const ampm = hours >= 12 ? 'PM' : 'AM';
                        const formattedHour = hours % 12 || 12;
                        const formattedMinute = minutes.toString().padStart(2, '0');

                        const date = `${day} ${month} ${year}`; // 4 Jul 2025
                        const time = `${formattedHour}:${formattedMinute} ${ampm}`; // 12:48 PM

                        const noteObj = {
                          text: newNote,
                          date: date,
                          time: time
                        };

                        const updated = [...(notes[activeGroup.name] || []), noteObj];
                        setNotes({ ...notes, [activeGroup.name]: updated });
                        setNewNote('');
                      }}
                      activeGroup={activeGroup}
                      onBack={() => setActiveGroup(null)}
                    />
                  )
              }
            </div>
          </>
        )
      }

      {
        showPopup && (
          <CreateGroupModal
            groupName={groupName}
            onChangeName={(e) => {
              const value = e.target.value;
              setGroupName(value);
              if (value.trim() === '') setError('');
              if (value.trim() !== '' && error === 'Group name cannot be empty') {
                setError('');
              }
            }}
            onCreate={handleCreateGroup}
            onClose={() => setShowPopup(false)}
            onColorSelect={setSelectedColor}
            selectedColor={selectedColor}
            error={error}
          />
        )
      }

    </div>
  );
}

export default App;
