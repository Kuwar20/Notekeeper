const NoteCard = ({ note, onEdit, onDelete, onTogglePin, darkMode }) => {
    return (
        <div
            className={`rounded-xl shadow-lg overflow-hidden relative group transition-all duration-300 ${darkMode ? "bg-neutral-800 text-neutral-100" : "bg-white text-neutral-800"}`}
        >
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className={`text-xl font-semibold line-clamp-1 hover:text-indigo-600 transition-colors duration-200 ${darkMode ? "text-neutral-100" : "text-gray-800"}`}>
                        {note.title}
                    </h3>
                    <button
                        onClick={() => onTogglePin(note.id, note.pinned)}
                        className={`ml-2 p-2 rounded-full transition duration-200 ${note.pinned
                            ? "bg-yellow-100 text-yellow-700"
                            : darkMode
                                ? "bg-neutral-700 text-neutral-300 hover:bg-neutral-600"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            } hover:scale-110`}
                    >
                        📌
                    </button>
                </div>
                <p className={`text-sm font-medium mb-3 ${darkMode ? "text-indigo-300" : "text-indigo-600"}`}>
                    {note.tagline}
                </p>
                <p className={`text-sm line-clamp-3 mb-4 ${darkMode ? "text-neutral-200" : "text-gray-700"}`}>
                    {note.body}
                </p>

                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                    <button
                        onClick={() => onEdit(note)}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 ${darkMode
                            ? "bg-neutral-700 text-neutral-200 hover:bg-neutral-600 focus:ring-neutral-500"
                            : "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 focus:ring-indigo-600"
                            }`}
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(note.id)}
                        className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 ${darkMode
                            ? "bg-neutral-700 text-neutral-200 hover:bg-neutral-600 focus:ring-neutral-500"
                            : "bg-red-50 text-red-600 hover:bg-red-100 focus:ring-red-600"
                            }`}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;