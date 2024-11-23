const NoteCard = ({ note, onEdit, onDelete, onTogglePin }) => {
    return (
        <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden relative group">
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-gray-800 line-clamp-1">
                        {note.title}
                    </h3>
                    <button
                        onClick={() => onTogglePin(note.id, note.pinned)}
                        className={`ml-2 p-2 rounded-full transition duration-200 ${note.pinned
                                ? "bg-yellow-100 text-yellow-700"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                    >
                        📌
                    </button>
                </div>
                <p className="text-sm text-indigo-600 font-medium mb-3">
                    {note.tagline}
                </p>
                <p className="text-gray-600 line-clamp-3">{note.body}</p>

                <div className="flex gap-3 mt-4 pt-4 border-t border-gray-100">
                    <button
                        onClick={() => onEdit(note)}
                        className="flex-1 py-2 px-4 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition duration-200 text-sm font-medium"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(note.id)}
                        className="flex-1 py-2 px-4 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition duration-200 text-sm font-medium"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NoteCard;