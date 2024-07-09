import React from 'react';

const Notif = () => {
    return (
        <div className="fixed bottom-4 right-4 transform translate-y-0 animate-bounce bg-white rounded-lg shadow-lg w-96 p-4">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-medium capitalize">Nouvelle notification</h3>
                <i className="fas fa-times cursor-pointer p-2 rounded-full bg-gray-200"></i>
            </div>
            <div className="flex items-start">
                <div className="relative">
                    <img
                        src=""
                        alt=""
                        className="w-16 h-16 rounded-full object-cover"
                    />
                    <i className="fas fa-thumbs-up absolute bottom-0 right-0 w-7 h-7 flex items-center justify-center rounded-full text-white bg-gradient-to-r from-blue-600 to-blue-400"></i>
                </div>
                <div className="pl-4">
                    <p className="mb-1 line-clamp-3 pr-12">
                        <strong>Ismael</strong>, <strong>TOLOJANAHARY Modeste</strong> et 154 autres ont réagi à votre publication dans <strong>Boum boum tam tam</strong>
                    </p>
                    <span className="text-blue-600 font-semibold text-sm">il y a quelques secondes</span>
                </div>
                <span className="absolute right-4 top-1/2 w-3 h-3 bg-blue-600 rounded-full"></span>
            </div>
        </div>
    );
};

export default Notif;