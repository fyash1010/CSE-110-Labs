import './App.css';
import { Label, Note } from "./types"; // Import the Label type from the appropriate module
import { dummyNotesList } from "./constants"; // Import the dummyNotesList from the appropriate module
import React, {useContext, useState} from 'react';
import { ThemeContext, themes } from './ThemeContext';
import ToggleTheme from "./ToggleTheme";

function App() {
  // Like feature
  const [noteList, setNoteList] = useState(dummyNotesList);
  const toggleLike = (id: number) => {
    setNoteList(noteList.map((note) => note.id === id ? { ...note, liked: !note.liked } : note));
  };
  const favNotes = noteList.filter(note => note.liked);

  // Theme feature
  const [currentTheme, setCurrentTheme] = useState(themes.light);
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === themes.light ? themes.dark : themes.light);
  };

  // Create feature
  const initialNote = {
    id: -1,
    title: "",
    content: "",
    label: Label.other,
    liked: false,
  };
  const [createNote, setCreateNote] = useState(initialNote);
  const createNoteHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const newNote = { ...createNote, id: noteList.length + 1 };
    setNoteList([newNote, ...noteList]);
    setCreateNote(initialNote);
  };

  // Edit feature
  const handleNoteChange = (event: React.FormEvent<HTMLDivElement>, field: string, id: number) => {
    const updatedNoteList = noteList.map((note) => {
      if (note.id === id) {
        return { ...note, [field]: (event.target as HTMLDivElement).innerText };
      }
      return note;
    });
    setNoteList(updatedNoteList);
  };

  const removeNote = (id: number) => {
    setNoteList(noteList.filter((note) => note.id !== id));
  };

	return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      <div className='app-container'>
        <form className="note-form" onSubmit={createNoteHandler}>
          <div>
            <input placeholder="Note Title" value={createNote.title} onChange={(event) => setCreateNote({ ...createNote, title: event.target.value })} required></input>
          </div>
          <div>
            <textarea placeholder="Note Content" value={createNote.content} onChange={(event) => setCreateNote({ ...createNote, content: event.target.value })} required></textarea>
          </div>
          <div>
            <select value={createNote.label} onChange={(event) => setCreateNote({ ...createNote, label: event.target.value as Label})} required>
              <option value={Label.personal}>Personal</option>
              <option value={Label.work}>Work</option>
              <option value={Label.study}>Study</option>
              <option value={Label.other}>Other</option>
            </select>
          </div>

          <div><button type="submit">Create Note</button></div>

          <div className="fav-notes">
            <h2>List of favourites:</h2>
            {favNotes.map(note => (
              <div key={note.id} className="fav-note">
                <p> {note.title} </p>
              </div>
            ))}
          </div>
        </form>

        <div className="notes-grid">
        <ToggleTheme />
          {noteList.map((note) => (
            <div key={note.id} className="note-item" style = {{ background: currentTheme.background}}>
              <div className="notes-header" style = {{ background: currentTheme.header}}>
                <button onClick={() => toggleLike(note.id)} style={{ color: note.liked ? 'red' : 'black' }}>♥</button>
                <button onClick={() => removeNote(note.id)}>x</button>
              </div>
              <h2 contentEditable={true} suppressContentEditableWarning={true} onBlur={(e) => handleNoteChange(e, 'title', note.id)} style = {{ color: currentTheme.title}}> {note.title} </h2>
              <p contentEditable={true} suppressContentEditableWarning={true} onBlur={(e) => handleNoteChange(e, 'content', note.id)} style = {{ color: currentTheme.content}}> {note.content} </p>
              <p contentEditable={true} suppressContentEditableWarning={true} onBlur={(e) => handleNoteChange(e, 'label', note.id)} style = {{ color: currentTheme.label}}> {note.label} </p>
            </div>
          ))}
        </div>
      </div>
    </ThemeContext.Provider>
	);
}

export default App;