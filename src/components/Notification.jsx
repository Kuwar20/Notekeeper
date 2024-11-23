import { useEffect } from "react";

const Notification = ({ message, onClose }) => {

    useEffect(() => {
        if (message) {
            const timer = setTimeout(onClose, 3000);
            return () => clearTimeout(timer);
        }
    }, [message, onClose]);

    if (!message) return null;

    return (
        <div className="fixed top-4 right-4 bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out">
            {message}
        </div>
    );
};

export default Notification;