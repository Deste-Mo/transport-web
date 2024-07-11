import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
    TextInput
} from "../../styles/components";

const Options = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [options, setOptions] = useState([]);

    const togglePopup = () => {
        setShowPopup(!showPopup);
    };

    return (
        <div className="relative">
            {options.length > 0 && (
                <div className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full"></div>
            )}

            <div className="text-secondary text-2xl cursor-pointer" onClick={togglePopup}>
                <i className="bi bi-caret-down"></i>
            </div>

            {showPopup && (
                <div className="absolute top-12 right-0 w-96 bg-white shadow-md rounded-lg overflow-hidden z-20">
                    <div className="py-2 px-4 bg-primary text-white text-lg font-semibold flex justify-between items-center">
                        <div>
                            Menu
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 p-4">
                        <ul className="border rounded-lg border-gray-200">
                            <div>
                            {/* <TextInput
                                title="Mot de passe"
                                type="password"
                                placeholder="Entrer votre mot de passe"
                                name="password"
                                onChange={(e) => inputsOnChange(e)}
                            /> */}
                            </div>
                            <li className="py-3 px-4 flex items-start justify-between border-b border-gray-200 last:border-b-0 hover:bg-gray-100">
                                <Link to="/social" className="text-sm">Social</Link>
                            </li>
                            <li className="py-3 px-4 flex items-start justify-between border-b border-gray-200 last:border-b-0 hover:bg-gray-100">
                                <Link to="/entertainment" className="text-sm">Divertissement</Link>
                            </li>
                            <li className="py-3 px-4 flex items-start justify-between border-b border-gray-200 last:border-b-0 hover:bg-gray-100">
                                <Link to="/shopping" className="text-sm">Shopping</Link>
                            </li>
                            <li className="py-3 px-4 flex items-start justify-between border-b border-gray-200 last:border-b-0 hover:bg-gray-100">
                                <Link to="/personal" className="text-sm">Personnel</Link>
                            </li>
                            <li className="py-3 px-4 flex items-start justify-between border-b border-gray-200 last:border-b-0 hover:bg-gray-100">
                                <Link to="/professional" className="text-sm">Professionnel</Link>
                            </li>
                            <li className="py-3 px-4 flex items-start justify-between border-b border-gray-200 last:border-b-0 hover:bg-gray-100">
                                <Link to="/community-resources" className="text-sm">Ressources communautaires</Link>
                            </li>
                            <li className="py-3 px-4 flex items-start justify-between border-b border-gray-200 last:border-b-0 hover:bg-gray-100">
                                <Link to="/meta-products" className="text-sm">Autres produits de Meta</Link>
                            </li>
                        </ul>
                        <ul className="border rounded-lg border-gray-200">
                            <div>
                                Créé
                            </div>
                            <li className="py-3 px-4 flex items-start justify-between border-b border-gray-200 last:border-b-0 hover:bg-gray-100">
                                <Link to="/publication" className="text-sm">Publication</Link>
                            </li>
                            <li className="py-3 px-4 flex items-start justify-between border-b border-gray-200 last:border-b-0 hover:bg-gray-100">
                                <Link to="/story" className="text-sm">Story</Link>
                            </li>
                            <li className="py-3 px-4 flex items-start justify-between border-b border-gray-200 last:border-b-0 hover:bg-gray-100">
                                <Link to="/reel" className="text-sm">Reel</Link>
                            </li>
                            <li className="py-3 px-4 flex items-start justify-between border-b border-gray-200 last:border-b-0 hover:bg-gray-100">
                                <Link to="/highlight-event" className="text-sm">Événement marquant</Link>
                            </li>
                            <li className="py-3 px-4 flex items-start justify-between border-b border-gray-200 last:border-b-0 hover:bg-gray-100">
                                <Link to="/page" className="text-sm">Page</Link>
                            </li>
                            <li className="py-3 px-4 flex items-start justify-between border-b border-gray-200 last:border-b-0 hover:bg-gray-100">
                                <Link to="/ads" className="text-sm">Publicité</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Options;
