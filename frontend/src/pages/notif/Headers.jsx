import React, { useState } from 'react';
import Notifications from './Notifications'; // Importez le composant Notifications
import Options from '../Parametre/Options';

const Headers = () => {
    const [activePopup, setActivePopup] = useState(null);

    const handleTogglePopup = (popupName) => {
        setActivePopup(popupName === activePopup ? null : popupName);
    };

    return (
        <div className="bg-white shadow-md fixed w-full top-0 left-0 z-10">
            <div className="max-w-6xl mx-auto px-4">
                <div className="flex justify-between items-center py-2">
                    {/* Section gauche */}
                    <div className="flex items-center">
                        <div className="text-primary text-2xl font-bold">
                            Media trans
                        </div>
                        <div className="ml-2 text-lg font-semibold">
                            <input
                                type="text"
                                placeholder="Rechercher"
                                className="form-control rounded-pill"
                            />
                        </div>
                    </div>

                    {/* Section centrale */}
                    <div className="flex items-center space-x-6">
                        <div className="text-primary text-2xl cursor-pointer">
                            <i className="bi bi-house-door"></i>
                        </div>
                        <div className="text-secondary text-2xl cursor-pointer">
                            <i className="bi bi-tv"></i>
                        </div>
                        <div className="text-secondary text-2xl cursor-pointer">
                            <i className="bi bi-shop"></i>
                        </div>
                        <div className="text-secondary text-2xl cursor-pointer">
                            <i className="bi bi-people"></i>
                        </div>
                        <div className="text-secondary text-2xl cursor-pointer">
                            <i className="bi bi-controller"></i>
                        </div>
                    </div>

                    {/* Section droite */}
                    <div className="flex items-center space-x-4">
                        {/* Composant Notifications */}
                        <Notifications togglePopup={() => handleTogglePopup('notifications')} />

                        <div className="text-secondary text-2xl cursor-pointer">
                            <i className="bi bi-chat-dots"></i>
                        </div>
                        
                        <Options togglePopup={() => handleTogglePopup('options')} />

                    </div>
                </div>
            </div>

            {/* Overlay pour fermer les pop-ups */}
            {activePopup && (
                <div
                    className="fixed inset-0 bg-black opacity-50 z-20"
                    onClick={() => setActivePopup(null)}
                ></div>
            )}
        </div>
    );
};

export default Headers;
