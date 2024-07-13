import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SocialMenu from './Social/SocialMenu';
import DivertissementMenu from './Divertissement/DivertissementMenu';
import ShoppingMenu from './Shopping/ShoppingMenu';

const Options = () => {
    const [showPopup, setShowPopup] = useState(false);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <div className="relative">
            <div className="text-secondary text-2xl cursor-pointer" onClick={togglePopup}>
                <i className="bi bi-caret-down"></i>
            </div>

            {showPopup && (
                <div className="absolute top-0 right-0 mt-8 w-[600px] bg-[#ddd] h-[900px] shadow-lg rounded-lg overflow-hidden z-20">
                    <div className="py-2 px-4 bg-primary text-white text-lg font-semibold flex justify-between items-center">
                        <div>Menu</div>
                    </div>
                    <div className="flex h-[100%]">
                        <ul className="w-3/3 p-4 ml-[10px] mr-[10px] bg-[whitesmoke] overflow-y-auto">
                            <SocialMenu />
                            <DivertissementMenu />
                            <ShoppingMenu />
                        </ul>
                        <ul className="w-1/2 p-4 mr-[10px] bg-[whitesmoke] overflow-y-auto">
                            <li className="py-3">
                                <div>
                                    Créer
                                </div>
                            </li>
                            <li className="py-3 ml-6">
                                <Link to="/publication" className="block text-sm text-gray-800 hover:text-blue-500">
                                    <i className="bi bi-journal-text mr-2 text-gray-500"></i>
                                    Publication
                                </Link>
                            </li>
                            <li className="py-3 ml-6">
                                <Link to="/story" className="block text-sm text-gray-800 hover:text-blue-500">
                                    <i className="bi bi-journal-bookmark mr-2 text-gray-500"></i>
                                    Story
                                </Link>
                            </li>
                            <li className="py-3 ml-6">
                                <Link to="/reel" className="block text-sm text-gray-800 hover:text-blue-500">
                                    <i className="bi bi-film mr-2 text-gray-500"></i>
                                    Reel
                                </Link>
                            </li>
                            <li className="py-3 ml-6">
                                <Link to="/highlight-event" className="block text-sm text-gray-800 hover:text-blue-500">
                                    <i className="bi bi-calendar-event mr-2 text-gray-500"></i>
                                    Événement marquant
                                </Link>
                            </li>
                            <li className="py-3 ml-6">
                                <Link to="/page" className="block text-sm text-gray-800 hover:text-blue-500">
                                    <i className="bi bi-file-text mr-2 text-gray-500"></i>
                                    Page
                                </Link>
                            </li>
                            <li className="py-3 ml-6">
                                <Link to="/ads" className="block text-sm text-gray-800 hover:text-blue-500">
                                    <i className="bi bi-megaphone mr-2 text-gray-500"></i>
                                    Publicité
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Options;
