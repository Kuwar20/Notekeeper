import React, { useState, useEffect } from "react";
import { notesService } from "./utils/supabase";
import NoteForm from "./components/NoteForm";
import NoteCard from "./components/NoteCard";
import Pagination from "./components/Pagination";
import Notification from "./components/Notification";
import { PlusCircle, Search, Moon, Sun } from "lucide-react";

const NOTES_PER_PAGE = 6;

const App = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentNote, setCurrentNote] = useState(null);
  const [notification, setNotification] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

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

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.body.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      setShowForm(false);
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

  const totalPages = Math.ceil(filteredNotes.length / NOTES_PER_PAGE);
  const paginatedNotes = filteredNotes.slice(
    (currentPage - 1) * NOTES_PER_PAGE,
    currentPage * NOTES_PER_PAGE
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode
      ? "bg-neutral-900 text-neutral-100"
      : "bg-neutral-50 text-neutral-900"
      }`}>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-12">
          <h1 className="text-3xl font-light tracking-tight">notekeeper</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
            >
              {darkMode ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </header>

        {/* Search and Add Note */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 rounded-lg border ${darkMode
                ? "bg-neutral-800 border-neutral-700 focus:border-neutral-600"
                : "bg-white border-neutral-200 focus:border-neutral-300"
                } outline-none transition-colors`}
            />
          </div>
          <button
            onClick={() => setShowForm(true)}
            className={`flex items-center justify-center px-4 py-2 rounded-lg ${darkMode
              ? "bg-neutral-800 hover:bg-neutral-700"
              : "bg-neutral-900 text-white hover:bg-neutral-800"
              } transition-colors`}
          >
            <PlusCircle className="w-4 h-4 mr-2" />
            <span className="font-medium">New Note</span>
          </button>
        </div>

        {/* Notification */}
        <Notification
          message={notification}
          onClose={() => setNotification("")}
        />

        {/* Note Form */}
        {(showForm || currentNote) && (
          <div className={`mb-8 rounded-xl ${darkMode
            ? "bg-neutral-800 shadow-lg shadow-neutral-900/50"
            : "bg-white shadow-lg shadow-neutral-200/50"
            }`}>
            <NoteForm
              note={currentNote || { title: "", tagline: "", body: "" }}
              currentNote={currentNote}
              onSave={handleSaveNote}
              onCancel={() => {
                setCurrentNote(null);
                setShowForm(false);
              }}
              darkMode={darkMode}
            />
          </div>
        )}

        {/* Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <div className="col-span-full flex justify-center items-center py-16">
              <div className={`w-3 h-3 rounded-full mr-2 animate-bounce ${darkMode ? 'bg-neutral-400' : 'bg-neutral-900'}`} style={{ animationDelay: '0ms' }}></div>
              <div className={`w-3 h-3 rounded-full mr-2 animate-bounce ${darkMode ? 'bg-neutral-400' : 'bg-neutral-900'}`} style={{ animationDelay: '150ms' }}></div>
              <div className={`w-3 h-3 rounded-full animate-bounce ${darkMode ? 'bg-neutral-400' : 'bg-neutral-900'}`} style={{ animationDelay: '300ms' }}></div>
            </div>
          ) : paginatedNotes.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <p className="text-neutral-500">
                {searchTerm ? "No notes match your search" : "No notes yet"}
              </p>
            </div>
          ) : (
            paginatedNotes.map((note) => (
              <div key={note.id} className="transform transition-transform duration-200 hover:-translate-y-1">
                <NoteCard
                  note={note}
                  onEdit={(note) => {
                    setCurrentNote(note);
                    setShowForm(true);
                  }}
                  onDelete={handleDeleteNote}
                  onTogglePin={handleTogglePin}
                  darkMode={darkMode}
                />
              </div>
            ))
          )}
        </div>

        {/* Pagination */}
        {filteredNotes.length > NOTES_PER_PAGE && (
          <div className="mt-8">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              darkMode={darkMode}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;