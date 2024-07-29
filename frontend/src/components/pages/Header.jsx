//import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { NAV_LINKS } from "../../constants/home.js";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppPorvider.jsx";
import ProfilePopup from "./ProfilePopup.jsx";
import { useAnimation } from "../../context/AnimationProvider.jsx";
import { motion } from "framer-motion";
import { profilePopupVariants } from "../../animations/variants.js";

export function Header({ profileImage }) {
    const location = useLocation();

    const { countUnread, handleCountUnread } = useApp()

    useEffect(() => {
        handleCountUnread()
    }, [countUnread, handleCountUnread])


    return <header className={`flex justify-between items-center bg-white-100 shadow-md py-4 px-8 fixed left-0 top-0 right-0 z-50`}>
        <div className="flex items-center gap-14 logo">
            <h1 className="text-subtitle-2">Media <span className="text-primary-100">Trans</span></h1>
            {/*<SearchBar variant="fill"  placeholder="Recherche sur media trans" size="lg"/>*/}
        </div>
        <div className="">
            <ul className="flex  items-end gap-20">
                <MyNavLink icon={"bi bi-grid"} name={"Accueil"} path={"/"} number={0} active={"/" === location.pathname.toLowerCase()} />
                <MyNavLink icon={"bi bi-chat-dots"} name={"Discussion"} path={"/discussion"} number={countUnread} active={"/discussion" === location.pathname.toLowerCase()} />
                <MyNavLink icon={"bi bi-briefcase"} name={"Offres"} path={"/offer"} number={0} active={"/offer" === location.pathname.toLowerCase()} />
                <MyNavLink icon={"bi bi-person"} name={"Amis"} path={"/friend"} number={0} active={"/friend" === location.pathname.toLowerCase()} />
                <MyNavLink icon={"bi bi-bell"} name={"Notifications"} path={"/notification"} number={0} active={"/notification" === location.pathname.toLowerCase()} />
            </ul>
        </div>
        <Profile profileImage={profileImage} />
    </header>
}



const Profile = ({ profileImage }) => {
    const { togglePopup, setTogglePopup } = useAnimation();
    const selectRef = useRef();

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (selectRef.current && !selectRef.current.contains(e.target)) {
                setTogglePopup(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div ref={selectRef} className="flex items-center gap-10 relative ">
            <div className="flex w-14 h-14 cursor-pointer items-center justify-center rounded-full shadow-xl bg-black-40" onClick={() => setTogglePopup(prev => !prev)}>
                <img src={profileImage} alt="" className="h-14 w-14 rounded-full " />
            </div>
            {
                togglePopup && <ProfilePopup className="fixed top-[86px] right-10" />
            }
        </div>
    )
}

const MyNavLink = ({ icon, name, number, path, active = false }) => {

    const navigate = useNavigate();

    const handleNavigate = () => {
        navigate(path)
    }


    return (
        <li onClick={handleNavigate}
            className={`flex flex-col justify-center items-center cursor-pointer relative hover:text-primary-100 ${active ? "text-primary-100" : "text-black-100"} `}>
            <i className={`${icon} text-icon`}></i>
            <span className="text-base">{name}</span>
            {
                number > 0 ?
                    <span className="absolute top-0 right-3 w-5 h-5 bg-danger-100 rounded-[50%] text-black-100 flex items-center justify-center">{number}</span>
                    :
                    null
            }
        </li>
    )
}

/*
Profile.propTypes = {
    profileImage: PropTypes.string.isRequired,
};

Header.propTypes = {
    profileImage: PropTypes.string.isRequired,
};


NavLink.propTypes = {
    icon: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    active: PropTypes.bool,
    onClick: PropTypes.func,
};
*/
