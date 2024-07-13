import React from 'react';
import { Link } from 'react-router-dom';

const SocialMenu = () => {
    return (
        <li className="py-3">
            Social
            <ul className="ml-6 w-[90%]">
                <li className="py-2 flex items-center">
                    <i className="bi bi-calendar-event mr-2 text-gray-500"></i>
                    <Link to="/social/events" className="block text-sm text-gray-800 hover:text-blue-500">
                        Événements
                        <br />
                        <span className="text-[grey] text-base">
                            Lorem ipsum dolor smet consectetur, adipisicing elit.
                        </span>
                    </Link>
                </li>
                <li className="py-2 flex items-center">
                    <i className="bi bi-people mr-2 text-gray-500"></i>
                    <Link to="/social/friends" className="block text-sm text-gray-800 hover:text-blue-500">
                        Amis
                        <br />
                        <span className="text-[gray] text-base">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        </span>
                    </Link>
                </li>
                <li className="py-2 flex items-center">
                    <i className="bi bi-people mr-2 text-gray-500"></i>
                    <Link to="/social/groups" className="block text-sm text-gray-800 hover:text-blue-500">
                        Groupes
                        <br />
                        <span className="text-[gray] text-base">
                            Lorem ipsum dolor sit amet consecteturkl, adipisicing elit.
                        </span>
                    </Link>
                </li>
                <li className="py-2 flex items-center">
                    <i className="bi bi-newspaper mr-2 text-gray-500"></i>
                    <Link to="/social/news-feed" className="block text-sm text-gray-800 hover:text-blue-500">
                        Fil d'actualité
                        <br />
                        <span className="text-[gray] text-base">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        </span>
                    </Link>
                </li>
                <li className="py-2 flex items-center">
                    <i className="bi bi-chat-dots mr-2 text-gray-500"></i>
                    <Link to="/social/chats" className="block text-sm text-gray-800 hover:text-blue-500">
                        Fils
                        <br />
                        <span className="text-[gray] text-base">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        </span>    
                    </Link>
                </li>
                <li className="py-2 flex items-center">
                    <i className="bi bi-file-text mr-2 text-gray-500"></i>
                    <Link to="/social/pages" className="block text-sm text-gray-800 hover:text-blue-500">
                        Pages
                        <br />
                        <span className="text-[gray] text-base">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        </span>
                    </Link>
                </li>
            </ul>
        </li>
    );
};

export default SocialMenu;
