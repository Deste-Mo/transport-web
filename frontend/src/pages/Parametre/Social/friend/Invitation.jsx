import React, { useEffect, useState } from 'react';
import Headers from '../../../notif/Headers';
import { Link } from 'react-router-dom';

const Invitation = () => {
    const [clientInvitations, setClientInvitations] = useState([]);
    const [truckDriverInvitations, setTruckDriverInvitations] = useState([]);
    const [companyInvitations, setCompanyInvitations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                const response = await fetch('/api/friends'); // Assuming '/api/friends' is your endpoint
                const invitations = await response.json();
                const clients = invitations.filter(invitation => invitation.accountType === 'Client');
                const truckDrivers = invitations.filter(invitation => invitation.accountType === 'Camionneur');
                const companies = invitations.filter(invitation => invitation.accountType === 'Entreprise');

                setClientInvitations(clients);
                setTruckDriverInvitations(truckDrivers);
                setCompanyInvitations(companies);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchInvitations();
    }, []);

    return (
        <div className="h-screen flex flex-col">
            <Headers />
            <div className="flex-1 overflow-y-auto">
                <div className="max-w-6xl mx-auto py-8 grid grid-cols-3 gap-4 h-full">
                    <div className="shadow-md py-4 rounded-lg col-span-1 h-full overflow-y-auto">
                        <div className="max-w-6xl mx-auto px-4 py-4 font-semibold flex justify-between items-center">
                            <div>
                                <h1 className='text-2xl font-bold'>Ami(e)s</h1>
                            </div>
                            <div className="relative">
                                <div className="cursor-pointer mt-[5px]">
                                    <i className="bi bi-gear"></i>
                                </div>
                            </div>
                        </div>
                        <div className="max-w-6xl mx-auto px-4 py-4 overflow-y-auto">
                            <ul className="space-y-2">
                                <li className="flex items-center">
                                    <Link to="/friends" className="flex items-center text-blue-600 hover:text-blue-800">
                                        <i className="bi bi-house-door mr-2"></i>
                                        <span>Accueil</span>
                                    </Link>
                                </li>
                                <li className="flex items-center">
                                    <Link to="/invitation" className="flex items-center font-bold text-blue-600 hover:text-blue-800">
                                        <i className="bi bi-person-plus mr-2"></i>
                                        <span>Invitation</span>
                                    </Link>
                                </li>
                                <li className="flex items-center">
                                    <Link to="/suggestion" className="flex items-center text-blue-600 hover:text-blue-800">
                                        <i className="bi bi-person-check mr-2"></i>
                                        <span>Suggestion</span>
                                    </Link>
                                </li>
                                <li className="flex items-center">
                                    <Link to="/all-friends" className="flex items-center text-blue-600 hover:text-blue-800">
                                        <i className="bi bi-people mr-2"></i>
                                        <span>Tou(te)s les ami(e)s</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="shadow-md py-4 rounded-lg col-span-2 h-full overflow-y-auto">
                        <div className="max-w-6xl mx-auto px-4 py-4 font-semibold flex justify-between items-center">
                            Profil
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Invitation;
