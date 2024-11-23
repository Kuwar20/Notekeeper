const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    if (totalPages <= 1) return null;

    return (
        <div className="flex justify-center items-center mt-8 gap-6">
            <button
                onClick={() => onPageChange("prev")}
                disabled={currentPage === 1}
                className={`px-5 py-2 rounded-lg font-medium transition duration-200 ${currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white text-indigo-600 hover:bg-indigo-50 shadow-sm"
                    }`}
            >
                Previous
            </button>
            <span className="text-gray-700 font-medium">
                Page {currentPage} of {totalPages}
            </span>
            <button
                onClick={() => onPageChange("next")}
                disabled={currentPage === totalPages}
                className={`px-5 py-2 rounded-lg font-medium transition duration-200 ${currentPage === totalPages
                        ? "bg-gray-100 text-gray-400"
                        : "bg-white text-indigo-600 hover:bg-indigo-50 shadow-sm"
                    }`}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;