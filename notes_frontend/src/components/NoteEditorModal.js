import React, { useState } from "react";

// PUBLIC_INTERFACE
function NoteEditorModal({ note, onSave, onClose }) {
  const [title, setTitle] = useState(note ? note.title : "");
  const [content, setContent] = useState(note ? note.content : "");

  // PUBLIC_INTERFACE
  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedContent = content.trim();
    if (!trimmedTitle && !trimmedContent) {
      alert("Please enter at least a title or content for your note.");
      return;
    }
    onSave({
      ...(note || {}),
      title: trimmedTitle,
      content: trimmedContent,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" tabIndex={-1}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        aria-modal="true"
        aria-label="Edit note"
      >
        <div className="modal-header">
          <div className="modal-title">{note ? "Edit Note" : "New Note"}</div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close">×</button>
        </div>
        <form className="modal-body" onSubmit={handleSubmit} autoComplete="off">
          <input
            autoFocus
            placeholder="Title"
            className="editor-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            aria-label="Note title"
            maxLength={100}
          />
          <textarea
            placeholder="Write your note here..."
            className="editor-content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            aria-label="Note content"
            rows={8}
            maxLength={1000}
          />
          <div className="modal-footer modal-footer-single">
            <button type="submit" className="modal-btn primary-btn">
              {note ? "Save Changes" : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default NoteEditorModal;
