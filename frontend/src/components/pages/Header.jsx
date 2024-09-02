//import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../../context/AppProvider.jsx";
import ProfilePopup from "./profile/ProfilePopup.jsx";
import { useAnimation } from "../../context/AnimationProvider.jsx";
import { useNotification } from "../../context/NotficationProvider.jsx";
import { useUser } from "../../context/UserProvider.jsx";
import Icon from "../ui/Icon.jsx";
import {useAuth} from "../../context/AuthProvider.jsx";
import {usePreference} from "../../context/UserPreferenceProvider.jsx";
import TemplatePopup, {OptionItem} from "../ui/TemplatePopup.jsx";
import Button from "../ui/Button.jsx";

export function Header({ profileImage }) {
  const { countUnread, getUnreadMessageCount } = useApp();
  const { unreadNotificationsCount, getUnreadNotifications } = useNotification();
  const { getFriends } = useUser();

  const NAV_LINKS = [
    {
      name: "Accueil",
      icon: "bi bi-grid",
      activeIcon: "bi bi-grid-fill",
      path: "/",
      number: 0,
    },
    {
      name: "Discussion",
      icon: "bi bi-chat",
      activeIcon: "bi bi-chat-fill",

      path: "/discussion",
      number: countUnread,
    },
    {
      name: "Offres",
      activeIcon: "bi bi-truck",

      icon: "bi bi-truck",
      path: "/offer",
      number: 0,
    },
    {
      name: "Suivis",
      icon: "bi bi-broadcast",
      activeIcon: "bi bi-broadcast",
      path: "/friend",
      number: 0,
    },
    {
      name: "Notifications",
      icon: "bi bi-bell",
      activeIcon: "bi bi-bell-fill",
      path: "/notification",
      number: unreadNotificationsCount,
    },
  ];

  useEffect(() => {
    getUnreadMessageCount();
  }, [countUnread]);

  useEffect(() => {
    getUnreadNotifications();
  }, [unreadNotificationsCount]);

  useEffect(() => {
    getFriends();
  }, []);

  return (
    <>
      <DesktopHeader
        NAV_LINKS={NAV_LINKS}
        profileImage={profileImage}
        className="max-md:hidden"
      />
      <MobileHeader
        NAV_LINKS={NAV_LINKS}
        profileImage={profileImage}
        className="md:hidden"
      />
    </>
  );
}

const MobileHeader = ({ className, NAV_LINKS, profileImage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showBackIcon } = useAnimation();
  const { hideMobileNavigation } = useAnimation();
  const { personalInformation } = useAuth();

  if (hideMobileNavigation) return ;

  return (
    <header
      className={`flex justify-between max-md:justify-center  items-center bi  z-40 ${className}`}
    >
      <div className="flex  items-center w-full justify-between max-md:items-center gap-20 max-lg:gap-10 py-4 px-8 fixed left-0 top-0 bg-white-100 dark:bg-white-0 text-black-100 dark:backdrop-blur-sm dark:text-white-100 shadow-md z-50">
        <div className="flex items-center gap-14 logo ">
          {showBackIcon && (
            <Icon
              size="sm"
              icon="bi bi-chevron-left"
              variant="secondary"
              onClick={() => navigate(-1)}
            />
          )}
          <h1 className="text-subtitle-2 max-lg:text-subtitle-3">
            Media <span className="text-primary-100">Trans</span>
          </h1>
        </div>
        <Profile profileImage={profileImage} />
      </div>

      <div className="">
        <ul className="flex  items-center w-full justify-between max-md:items-center  py-4 px-8 fixed left-0 bottom-0 bg-white-100 dark:bg-white-0 text-black-100 dark:backdrop-blur-sm dark:text-white-100 shadow-md z-50">
          {
            personalInformation.isVerify &&
            NAV_LINKS.map((navlink) => (
            <NavLink
              forMobile
              key={navlink.name}
              {...navlink}
              active={
                navlink.path.toLowerCase() === location.pathname.toLowerCase()
              }
              onClick={() => navigate(navlink.path)}
              number={navlink.number}
            />
          ))}
        </ul>
      </div>
    </header>
  );
};

const DesktopHeader = ({ className, NAV_LINKS, profileImage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { personalInformation } = useAuth();
  return (
    <header
      className={`flex justify-between items-center bg-white-100 dark:bg-white-0 text-black-100 dark:backdrop-blur-sm dark:text-white-100 shadow-md py-4 px-8 fixed left-0 top-0 right-0 z-40 ${className}`}
    >
      <div className="flex items-center gap-14 logo">
        <h1 className="text-subtitle-2 max-lg:text-subtitle-3">
          Media <span className="text-primary-100">Trans</span>
        </h1>
      </div>
      <div className="">
        <ul className="flex  items-end gap-20 max-lg:gap-10">
          {
            personalInformation.isVerify &&
            NAV_LINKS.map((navlink) => (
            <NavLink
              key={navlink.name}
              {...navlink}
              number={navlink.number}
              active={
                navlink.path.toLowerCase() === location.pathname.toLowerCase()
              }
              onClick={() => navigate(navlink.path)}
            />
          ))}
        </ul>
      </div>
      <Profile profileImage={profileImage} />
    </header>
  );
};

const Profile = ({ profileImage, className }) => {
  const [ togglePopup, setTogglePopup ]= useState(false);
  const {logout, personalInformation} = useAuth();
  const {darkMode, setDarkMode} = usePreference();
  const navigate = useNavigate();
  const handleLogout = () => {
    setTogglePopup(false);
    logout();
  };

  return (
    <div
      className={`flex items-center justify-center gap-10 relative  ${className}`}
    >
      <div
        className="flex size-14 max-md:size-10 cursor-pointer items-center justify-center rounded-full shadow-xl bg-black-40"
        onClick={() => setTogglePopup((prev) => !prev)}
      >
        <img src={profileImage} alt="" className="size-full rounded-full object-cover" />
      </div>
      {/*{togglePopup && <ProfilePopup className="fixed top-[86px] right-10" />}*/}
      <TemplatePopup setPopupVisible={setTogglePopup} popupVisible={togglePopup} className="fixed top-[86px] right-10" hideOnOutsideClick={false}>
          <OptionItem
            onClick={() => {
              setTogglePopup(false);
              navigate(`/profile/${personalInformation.id}`);
            }}
            name="Profil"
            icon="bi bi-person"
          />
          <OptionItem
            onClick={() => {
              setTogglePopup(false);
            }}
            name="Paramètres"
            icon="bi bi-gear"
          />
          <OptionItem
            onClick={() => {
              setDarkMode(prev => !prev);
            }}
            name="Changer le thème"
            icon={darkMode ? "bi bi-moon" : "bi bi-sun"}
          />
          <div className=" w-full p-2">
            <Button
                onClick={handleLogout}
                variant="secondary"
                size="sm"
                block
            >
              Deconnexion
            </Button>
          </div>
      </TemplatePopup>
    </div>
  );
};

const NavLink = ({
  icon,
  name,
  active = false,
  onClick,
  number = 0,
  forMobile = false,
  activeIcon = "",
}) => {
  return (
    <li
      onClick={onClick}
      className={` flex flex-col justify-center items-center cursor-pointer group hover:text-primary-100 ${
        active ? "text-primary-100" : "text-black-100 dark:text-white-100"
      } `}
    >
      <i className={`${active ? activeIcon : icon}  text-icon`}></i>
      <span
        className={`${
          forMobile ? "text-small-2" : "text-small-1"
        } group-hover:text-primary-100 relative ${
          active ? "text-primary-100" : "text-black-80 dark:text-white-100"
        }`}
      >
        {number > 0 && (
          <div className="absolute max-md:text-small-3 max-md:font-sm bottom-10 -right-2 bg-danger-100 text-white-100 size-[24px] flex items-center justify-center px-2 py-2 rounded-full">
            {number}
          </div>
        )}
        {name}
      </span>
    </li>
  );
};

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
