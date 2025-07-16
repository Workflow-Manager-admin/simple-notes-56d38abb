import React from "react";

// PUBLIC_INTERFACE
function NoteDetailModal({ note, onClose, onEdit, onDelete }) {
  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" tabIndex={-1}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        aria-modal="true"
        aria-label="Note details"
      >
        <div className="modal-header">
          <div className="modal-title">{note.title || <em>Untitled</em>}</div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="modal-body">
          <div className="note-detail-body">
            {note.content ? (
              <div className="note-content">{note.content}</div>
            ) : (
              <em className="note-empty">(No content yet)</em>
            )}
          </div>
          <div className="modal-note-meta">
            <div>
              <small>
                Created: {note.created ? new Date(note.created).toLocaleString() : "-"}
              </small>
            </div>
          </div>
        </div>
        <div className="modal-footer">
          <button
            className="modal-btn"
            onClick={() => onEdit(note)}
            aria-label="Edit note"
          >
            Edit
          </button>
          <button
            className="modal-btn modal-btn-danger"
            onClick={() => {
              if (window.confirm("Delete this note?")) onDelete(note.id);
            }}
            aria-label="Delete note"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default NoteDetailModal;
