import React from 'react';
import Headers from './Headers';

const Notif = ({ user, action, target, time }) => {
    return (
        <div className="flex items-start">
            <div className="relative">
                <img
                    src={`https://via.placeholder.com/50?text=${user}`}
                    alt={user}
                    className="w-10 h-10 rounded-full object-cover"
                />
            </div>
            <div className="ml-3">
                <p className="text-sm font-medium">
                    <span className="text-blue-600">{user}</span>{" "}
                    {action} dans{" "}
                    <span className="text-blue-600">{target}</span>
                </p>
                <p className="text-xs text-gray-500">{time}</p>
            </div>
        </div>
    );
};

export default Notif;
