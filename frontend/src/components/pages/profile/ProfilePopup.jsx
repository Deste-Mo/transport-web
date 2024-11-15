import {Button} from "../../../styles/components.js";
import {useAuth} from "../../../context/AuthProvider.jsx";
import {useNavigate} from "react-router-dom";
import {useApp} from "../../../context/AppProvider.jsx";
import {useAnimation} from "../../../context/AnimationProvider.jsx";
import {usePreference} from "../../../context/UserPreferenceProvider.jsx";
import {useEffect, useRef} from "react";

const ProfilePopup = ({className}) => {
    const {logout, personalInformation} = useAuth();
    const {darkMode, setDarkMode} = usePreference();
    const navigate = useNavigate();
    const {setTogglePopup} = useAnimation();
    const selectRef = useRef(null);

    const currentUser = personalInformation;

    const handleLogout = () => {
        setTogglePopup(false);
        logout();
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (selectRef.current && !selectRef.current.contains(e.target))
                setTogglePopup(false)
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);


    return (
        <div
            ref={selectRef}
            className={`flex select-none flex-col items-center justify-center gap-4 w-[230px] p-2 rounded-xl bg-white-100 dark:bg-white-0  shadow-sm border border-black-0 ${className}`}
        >
            <SettingItem
                onClick={() => {
                    setTogglePopup(false);
                    navigate(`/profile/${currentUser.id}`);
                }}
                name="Profil"
                icon="bi bi-person"
            />
           {/* <SettingItem
                onClick={() => {
                    setTogglePopup(false);
                }}
                name="Paramètres"
                icon="bi bi-gear"
            />*/}
            <SettingItem
                onClick={() => {

                    setDarkMode(prev => !prev);
                }}
                name="Changer le thème"
                icon={darkMode ? "bi bi-moon" : "bi bi-sun"}
            />
            <div className="w-full border border-black-10"/>
            <Button onClick={handleLogout} variant="secondary" size="sm" block>
                Deconnexion
            </Button>
        </div>
    );
};

const SettingItem = ({name, icon, onClick}) => {
    return (
        <div
            className="flex items-center justify-start w-full px-6 py-2 hover:bg-black-10 rounded-xl gap-2 cursor-pointer "
            onClick={onClick}
        >
            <i className={`${icon}`}></i>
            <p className="text-small-1 text-black-100 dark:text-white-100">{name}</p>
        </div>
    );
};

export default ProfilePopup;
