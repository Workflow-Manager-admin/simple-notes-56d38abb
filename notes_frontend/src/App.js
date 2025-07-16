import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import NoteList from "./components/NoteList";
import NoteDetailModal from "./components/NoteDetailModal";
import NoteEditorModal from "./components/NoteEditorModal";
import { loadNotes, saveNotes } from "./utils/localStorage";

// PUBLIC_INTERFACE
function App() {
  // Notes state
  const [notes, setNotes] = useState([]);
  // Modal/side panel visibility
  const [activeNote, setActiveNote] = useState(null); // Note for detail view
  const [editMode, setEditMode] = useState(false); // true: editing or creating
  const [showEditor, setShowEditor] = useState(false); // whether editor modal open
  // Search state
  const [searchTerm, setSearchTerm] = useState("");

  // Load notes from localStorage on mount
  useEffect(() => {
    setNotes(loadNotes());
  }, []);

  // Save notes to localStorage whenever they change
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  // PUBLIC_INTERFACE
  const onCreate = () => {
    setEditMode(true);
    setActiveNote(null);
    setShowEditor(true);
  };

  // PUBLIC_INTERFACE
  const onEdit = (note) => {
    setEditMode(true);
    setActiveNote(note);
    setShowEditor(true);
  };

  // PUBLIC_INTERFACE
  const onSave = (note) => {
    // Add or update note
    let updated = [];
    if (note.id) {
      // Editing
      updated = notes.map((n) => (n.id === note.id ? note : n));
    } else {
      // New note: assign id and timestamp
      note.id = Date.now().toString();
      note.created = new Date().toISOString();
      updated = [note, ...notes];
    }
    setNotes(updated);
    setShowEditor(false);
    setEditMode(false);
    setActiveNote(null);
  };

  // PUBLIC_INTERFACE
  const onDelete = (id) => {
    setNotes(notes.filter((n) => n.id !== id));
    setActiveNote(null);
    setShowEditor(false);
    setEditMode(false);
  };

  // PUBLIC_INTERFACE
  const onViewDetails = (note) => {
    setActiveNote(note);
    setShowEditor(false);
    setEditMode(false);
  };

  // PUBLIC_INTERFACE
  const onCloseDetail = () => setActiveNote(null);

  // PUBLIC_INTERFACE
  const onSearch = (value) => setSearchTerm(value);

  // Filter notes by search
  const filteredNotes = notes.filter((n) =>
    [n.title, n.content]
      .join(" ")
      .toLowerCase()
      .includes(searchTerm.trim().toLowerCase())
  );

  return (
    <div className="notes-app">
      <Header onCreate={onCreate} searchTerm={searchTerm} onSearch={onSearch} />
      <main className="main-container">
        <NoteList
          notes={filteredNotes}
          onViewDetails={onViewDetails}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        {/* Details Modal/Panel */}
        {activeNote && !editMode && (
          <NoteDetailModal
            note={activeNote}
            onClose={onCloseDetail}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        )}
        {/* Editor Modal/Panel */}
        {showEditor && (
          <NoteEditorModal
            note={editMode ? activeNote : null}
            onSave={onSave}
            onClose={() => {
              setShowEditor(false);
              setEditMode(false);
              setActiveNote(null);
            }}
          />
        )}
      </main>
      <footer className="footer">
        <span>
          Simple Notes • Powered by React • Data saved in your browser’s local storage
        </span>
      </footer>
    </div>
  );
}

export default App;
