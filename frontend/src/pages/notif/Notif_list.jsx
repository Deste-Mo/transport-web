import React from 'react';

const Notif_list = ({ user, action, target, time }) => {
    return (
        <div className="flex items-start">
            <div className="relative">
                <img
                    src={`https://via.placeholder.com/50?text=${user}`}
                    alt={user}
                    className="w-10 h-10 rounded-full object-cover"
                />
            </div>
            <div className="ml-3 flex-1">
                <p className="text-sm font-medium leading-tight">
                    <span className="text-blue-600">{user}</span>{" "}
                    {action} dans{" "}
                    <span className="text-blue-600">{target}</span>
                </p>
                <p className="text-xs text-gray-500">{time}</p>
            </div>
        </div>
    );
};

export default Notif_list;
