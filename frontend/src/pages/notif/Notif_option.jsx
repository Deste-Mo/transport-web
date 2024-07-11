import React from 'react';

const Notif_option = ({ options }) => {
    return (
        <div className="absolute top-8 right-0 mt-[55px] mr-[15px] w-48 bg-black-100 text-white-100 shadow-md rounded-lg overflow-hidden z-20">
            <ul>
                {options.map((option, index) => (
                    <li key={index} className="py-2 px-4 hover:bg-gray-100 text-black cursor-pointer" onClick={option.action}>
                        <i className={`bi ${option.icon} text-blue-600 mr-2`}></i>
                        <span>{option.label}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notif_option;
