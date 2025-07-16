import React from "react";

// PUBLIC_INTERFACE
function Header({ onCreate, searchTerm, onSearch }) {
  return (
    <header className="header">
      <div className="header-title">📝 Simple Notes</div>
      <div className="header-controls">
        <button className="create-btn" onClick={onCreate} title="Create a note">
          ＋ New Note
        </button>
        <input
          className="search-input"
          placeholder="Search notes…"
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
          aria-label="Search notes"
        />
      </div>
    </header>
  );
}

export default Header;
