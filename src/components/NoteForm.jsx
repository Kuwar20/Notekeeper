import React, { useState } from 'react';

const NoteForm = ({ note, currentNote, onSave, onCancel }) => {
  const [formData, setFormData] = useState(note);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.tagline || !formData.body) {
      return;
    }
    onSave(formData);
  };

  return (
    <div className="bg-white rounded-xl shadow-xl mb-8 overflow-hidden">
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {currentNote ? "Edit Note" : "Add a New Note"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition duration-200"
          />
          <input
            type="text"
            placeholder="Tagline"
            value={formData.tagline}
            onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition duration-200"
          />
          <textarea
            placeholder="Body"
            value={formData.body}
            onChange={(e) => setFormData({ ...formData, body: e.target.value })}
            className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-indigo-400 focus:border-transparent outline-none transition duration-200 min-h-32"
          />
          <div className="flex gap-4">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200 font-medium"
            >
              {currentNote ? "Update Note" : "Add Note"}
            </button>
            {currentNote && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition duration-200 font-medium"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteForm;