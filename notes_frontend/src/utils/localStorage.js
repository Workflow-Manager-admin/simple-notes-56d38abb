const STORAGE_KEY = "kavia-simple-notes";

// PUBLIC_INTERFACE
export function loadNotes() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
}

// PUBLIC_INTERFACE
export function saveNotes(notes) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch (e) {
    // ignore: localStorage full or unavailable
  }
}
