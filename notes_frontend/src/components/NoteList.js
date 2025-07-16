import React from "react";

// PUBLIC_INTERFACE
function NoteList({ notes, onViewDetails, onEdit, onDelete }) {
  if (notes.length === 0) {
    return (
      <div className="empty-list-msg">
        <span>No notes found. Create one!</span>
      </div>
    );
  }
  return (
    <div className="note-list">
      {notes.map((note) => (
        <div
          className="note-card"
          key={note.id}
          tabIndex={0}
          onClick={() => onViewDetails(note)}
          aria-label={`View details for note titled ${note.title || "(untitled)"}`}
        >
          <div className="note-card-header">
            <div className="note-title">{note.title || <em>Untitled</em>}</div>
            <div className="note-card-actions">
              <button
                className="icon-btn"
                title="Edit note"
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(note);
                }}
                aria-label="Edit note"
              >
                ✏️
              </button>
              <button
                className="icon-btn"
                title="Delete note"
                onClick={(e) => {
                  e.stopPropagation();
                  if (window.confirm("Delete this note?")) onDelete(note.id);
                }}
                aria-label="Delete note"
              >
                🗑️
              </button>
            </div>
          </div>
          <div className="note-snippet">
            {note.content ? (
              note.content.length > 100
                ? note.content.slice(0, 100) + "…"
                : note.content
            ) : (
              <em className="note-empty">(No content)</em>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default NoteList;
