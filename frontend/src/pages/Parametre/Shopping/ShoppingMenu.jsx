import React from 'react';
import { Link } from 'react-router-dom';

const ShoppingMenu = () => {
    return (
        <li className="py-3">
            Shopping
            <ul className="ml-6">
                <li className="py-2 flex items-center">
                    <i className="bi bi-calendar-event mr-2 text-gray-500"></i>
                    <Link to="/social/events" className="block text-sm text-gray-800 hover:text-blue-500">
                    Shopping1
                        <br />
                        <span className="text-[gray] text-base">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        </span>
                    </Link>
                </li>
                <li className="py-2 flex items-center">
                    <i className="bi bi-people mr-2 text-gray-500"></i>
                    <Link to="/social/friends" className="block text-sm text-gray-800 hover:text-blue-500">
                        Shopping2
                        <br />
                        <span className="text-[gray] text-base">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                        </span>
                    </Link>
                </li>
                <li className="py-2 flex items-center">
                    <i className="bi bi-people mr-2 text-gray-500"></i>
                    <Link to="/social/groups" className="block text-sm text-gray-800 hover:text-blue-500">
                        Shopping3
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

export default ShoppingMenu;
