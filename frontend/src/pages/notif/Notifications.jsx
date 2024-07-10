import React, { useState, useEffect } from 'react';
import Notif_list from './Notif_list';
import { Link } from 'react-router-dom';

const Notifications = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Fetch notifications from backend
        const fetchNotifications = async () => {
            try {
                const response = await fetch('/api/notifications'); 
                const data = await response.json();
                setNotifications(data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        };

        fetchNotifications();
    }, []);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <div className="relative">
            {notifications.length > 0 && (
                <div className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></div>
            )}

            <div className="text-secondary text-2xl cursor-pointer" onClick={togglePopup}>
                <i className="bi bi-bell"></i>
            </div>

            {showPopup && (
                <div className="absolute top-12 right-0 w-72 bg-white shadow-md rounded-lg overflow-hidden z-20">
                    <div className="py-2 px-4 bg-primary text-white text-lg font-semibold">
                        Notifications
                    </div>
                    <ul>
                        {notifications.map((notif) => (
                            <Link to="id_notification" key={notif.id} className="py-3 px-4 flex items-start justify-between border-b border-gray-200 last:border-b-0">
                                <Notif_list {...notif} />
                                <span className={`h-2 w-2 rounded-full ${notif.online ? 'bg-green-500' : 'bg-gray-400'}`}></span>
                            </Link>
                        ))}
                    </ul>
                    <div className="bg-gray-100 px-4 py-3">
                        <button className="block w-full text-center text-blue-600 font-semibold hover:underline">
                            Voir toutes les notifications
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Notifications;
