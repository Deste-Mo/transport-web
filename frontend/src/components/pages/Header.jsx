//import PropTypes from "prop-types";
import SearchBar from "../ui/SearchBar";
import {useEffect, useState} from "react";
import {SERVERLINK} from "../../constants/index.js";
import {NAV_LINKS} from "../../constants/home.js";
import {useLocation, useNavigate} from "react-router-dom";
import Button from "../ui/Button.jsx";
import {useAuth} from "../../context/AuthProvider.jsx";
import MyNavLink from "./MyNavLink.jsx";
import { useApp } from "../../context/AppPorvider.jsx";

export function Header({profileImage}) {
    const [active, setActive] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const { countUnread, handleCountUnread } = useApp()

    useEffect(() => {
        handleCountUnread()
    }, [countUnread, handleCountUnread])

    return <header className={`flex justify-between items-center bg-white-100 shadow-md py-4 px-8 fixed left-0 top-0 right-0 z-50`}>
        <div className="flex items-center gap-14 logo">
            <h1 className="text-subtitle-2">Media <span className="text-primary-100">Trans</span></h1>
            <SearchBar variant="fill"  placeholder="Recherche sur media trans" size="lg"/>
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
        <Profile profileImage={profileImage}/>
    </header>
}



const Profile = ({profileImage}) => {
    const navigate = useNavigate();
    const [active, setActive] = useState(false)
    const {logout} = useAuth();
    

    return (
        <div className="flex items-center gap-10 relative ">
            <div className="flex w-14 h-14 cursor-pointer items-center justify-center rounded-full shadow-xl bg-black-40" onClick={() => navigate("/profile")}>
                <img src={profileImage} alt="" className="h-14 w-14 rounded-full "/>
            </div>
            {/*<i className="bi bi-person text-icon"></i>*/}
            <Button  onClick={logout} > Deconnexion </Button>
        </div>
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
