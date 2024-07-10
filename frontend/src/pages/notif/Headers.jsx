import React from 'react';
import Notifications from './Notifications'; // Importez le composant Notifications

const Headers = () => {
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
                        <Notifications />

                        <div className="text-secondary text-2xl cursor-pointer">
                            <i className="bi bi-chat-dots"></i>
                        </div>
                        <div className="text-secondary text-2xl cursor-pointer">
                            <i className="bi bi-caret-down"></i>
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Headers;