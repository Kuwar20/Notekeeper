import React, { useState, useEffect } from "react";
import { notesService } from "./utils/supabase";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";
import Pagination from "./components/Pagination";
import Notification from "./components/Notification";

const NOTES_PER_PAGE = 6;

const App = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [notification, setNotification] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const data = await notesService.fetchNotes();
      setNotes(data);
    } catch (error) {
      setNotification("Error fetching notes.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSaveNote = async (noteData) => {
    try {
      if (currentNote) {
        await notesService.updateNote(currentNote.id, noteData);
        setNotification("Note updated successfully!");
      } else {
        await notesService.addNote(noteData);
        setNotification("Note added successfully!");
      }
      setCurrentNote(null);
      fetchNotes();
    } catch (error) {
      setNotification(currentNote ? "Error updating note." : "Error adding note.");
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await notesService.deleteNote(noteId);
      setNotification("Note deleted successfully!");
      fetchNotes();
    } catch (error) {
      setNotification("Error deleting note.");
    }
  };

  const handleTogglePin = async (noteId, isPinned) => {
    try {
      await notesService.togglePin(noteId, isPinned);
      fetchNotes();
    } catch (error) {
      setNotification("Error updating pin status.");
    }
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const totalPages = Math.ceil(notes.length / NOTES_PER_PAGE);
  const paginatedNotes = notes.slice(
    (currentPage - 1) * NOTES_PER_PAGE,
    currentPage * NOTES_PER_PAGE
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-900 tracking-tight">
          Notekeeper
        </h1>

        <Notification 
          message={notification} 
          onClose={() => setNotification("")} 
        />

        <NoteForm
          note={currentNote || { title: "", tagline: "", body: "" }}
          currentNote={currentNote}
          onSave={handleSaveNote}
          onCancel={() => setCurrentNote(null)}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full text-center py-12">
              <div className="text-lg text-gray-600">Loading notes...</div>
            </div>
          ) : (
            paginatedNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={setCurrentNote}
                onDelete={handleDeleteNote}
                onTogglePin={handleTogglePin}
              />
            ))
          )}
        </div>

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default App;

