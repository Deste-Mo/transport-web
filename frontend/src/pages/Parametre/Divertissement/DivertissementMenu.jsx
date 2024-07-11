import React from 'react';
import { Link } from 'react-router-dom';

const DivertissementMenu = () => {
    return (
        <li className="py-3">
            Divertissement
            <ul className="ml-6">
                <li className="py-2 flex items-center">
                    <i className="bi bi-calendar-event mr-2 text-gray-500"></i>
                    <Link to="/diver/diver1" className="block text-sm text-gray-800 hover:text-blue-500">
                    Divertissement1
                        <br />
                        <span className="text-[gray] text-base">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        </span>
                    </Link>
                </li>
                <li className="py-2 flex items-center">
                    <i className="bi bi-people mr-2 text-gray-500"></i>
                    <Link to="/diver/diver2" className="block text-sm text-gray-800 hover:text-blue-500">
                        Divertissement2
                        <br />
                        <span className="text-[gray] text-base">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        </span>
                    </Link>
                </li>
                <li className="py-2 flex items-center">
                    <i className="bi bi-people mr-2 text-gray-500"></i>
                    <Link to="/diver/diver3" className="block text-sm text-gray-800 hover:text-blue-500">
                        Divertissement3
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

export default DivertissementMenu;
