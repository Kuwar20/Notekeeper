const NoteCard = ({ note, onEdit, onDelete, onTogglePin }) => {
    return (
        <div className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden relative group">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-800 line-clamp-1 hover:text-indigo-600 transition-colors duration-200">
                        {note.title}
                    </h3>
                    <button
                        onClick={() => onTogglePin(note.id, note.pinned)}
                        className={`ml-2 p-2 rounded-full transition duration-200 ${note.pinned
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            } hover:scale-110`}
                    >
                        📌
                    </button>
                </div>
                <p className="text-sm text-indigo-600 font-medium mb-3">
                    {note.tagline}
                </p>
                <p className="text-gray-700 text-sm line-clamp-3 mb-4">
                    {note.body}
                </p>

                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-200">
                    <button
                        onClick={() => onEdit(note)}
                        className="flex-1 py-2 px-4 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-600"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(note.id)}
                        className="flex-1 py-2 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-red-600"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;