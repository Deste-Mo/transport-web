import { useNavigate } from "react-router-dom";
import ProfileImage from "../../../assets/images/OIP.jpg";
import OfferImage from "../../../assets/images/voiture.jpg";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../ui/Button.jsx";
import { Icon } from "../../../styles/components.js";

import OfferDetailBadge from "./OfferDetailBadge.jsx";
import OfferCardLoading from "../../loader/OfferCardLoading.jsx";
import { useAnimation } from "framer-motion";
import { TOAST_TYPE } from "../../../constants/index.js";

const OfferCard = ({
  className,
  saved = false,
  forCurrentUser = false,
  detailedProfile = true,
}) => {
  const [detailed, setDetailed] = useState(true);
  const [loading, setLoading] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);

  const toggleOfferCardPopup = () => {
    setPopupVisible((prev) => !prev);
  };

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  const navigate = useNavigate();

  return loading ? (
    <OfferCardLoading detailedProfile={detailedProfile} />
  ) : (
    <div className="flex flex-col items-start justify-start w-full gap-2 ">
      <div className="flex items-center gap-x-6 gap-y-2 flex-wrap">
        <OfferDetailBadge text="Transport de marchandise" icon="bi bi-box" />
        <OfferDetailBadge
          text="Fianarantsoa vers Tananarive"
          icon="bi bi-map"
        />
        <OfferDetailBadge
          text=" Prévue le 04 août 2024"
          icon="bi bi-calendar2-event"
        />
        <OfferDetailBadge text="5 Tonnes" icon="bi bi-truck" />
      </div>
      <div
        className={`relative flex flex-col gap-3 w-full items-center ${className} bg-white-100  dark:bg-black-100 dark:text-white-100 dark:font-sm dark:bg-white-10 dark:border-none rounded-xl p-4 border border-black-0`}
      >
        {popupVisible && (
          <div className="absolute top-10 right-10">
            <OfferCardPopup setPopupVisible={setPopupVisible} />
          </div>
        )}
        <div className="w-full flex items-center justify-between rounded-2xl">
          <div className="flex items-center gap-2">
            <img
              className="size-[40px] object-cover rounded-full"
              src={ProfileImage}
            />
            <div className="flex flex-col items-start">
              <p className="text-small-1 font-md">RAHARISOA Haingonirina </p>
              <span className=" dark:font-sm text-small-2">Entreprise</span>
              <div className="flex items-center gap-2  dark:text-white-100 text-black-80 ">
                <i className="bi bi-clock"></i>
                <span className="text-small-2  ">Il y a 30 minutes</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            {forCurrentUser && (
              <Icon
                onClick={() => toggleOfferCardPopup()}
                size="sm"
                variant="ghost"
                icon="bi bi-three-dots-vertical"
              />
            )}{" "}
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 items-start justify-cente  rounded-2xl  ">
          {detailed && (
            <p className="text-small-1 text-black-100 dark:text-white-100 dark:font-sm ">
              Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet Lorem ipsum
              dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit
              amet, Lorem ipsum dolor{" "}
              <span className="text-primary-80"> #sit amet </span>
              Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet
            </p>
          )}
          <button
            className="flex gap-1 items-center"
            onClick={() => setDetailed((prev) => !prev)}
          >
            {/*<i className={`bi bi-chevron-${detailed ? 'up' : 'down'}`}></i>*/}
            <p className="underline text-small-2 text-black-100 dark:text-white-80">
              {detailed ? "Moin" : "Plus"} de details
            </p>
          </button>
        </div>
        {detailedProfile && (
          <img
            src={OfferImage}
            className="w-full h-[256px] object-cover rounded-xl"
          />
        )}
        {!forCurrentUser && (
          <div className="flex items-center w-full gap-6 jusify-start">
            {/*<Icon variant="secondary" icon="bi bi-chat" size="sm"/>*/}
            <Button
              onClick={() => navigate(`discussion`)}
              size="sm"
              variant="secondary"
              icon="bi bi-chat"
              rounded="full"
            >
              Contacter
            </Button>
            {saved ? (
              <Button
                size="sm"
                variant="danger"
                icon="bi bi-bookmark-dash"
                rounded="full"
              >
                Retirer
              </Button>
            ) : (
              <Button
                size="sm"
                variant="secondary"
                icon="bi bi-bookmark"
                rounded="full"
              >
                Sauvegarder
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default OfferCard;

const OfferCardPopup = ({ setPopupVisible }) => {
  const { setMessagePopup } = useAnimation();

  const selectRef = useRef(null);

  const handleDeletePost = () => {
    // TODO :
    // - Deleting the post
    setPopupVisible(false);
    setMessagePopup("Offre supprimé avec success", TOAST_TYPE.success);
  };

  const handleEditPost = () => {
    // TODO :
    // - Editing the post
    setPopupVisible(false);
  };

  const handleExpirePost = () => {
    // TODO :

    setPopupVisible(false);
    setMessagePopup(
      "L'offre est maitenant rendu indisponible",
      TOAST_TYPE.success
    );
  };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setPopupVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  return (
    <div
      ref={selectRef}
      className={`flex select-none flex-col items-center justify-center gap-4 w-[230px] p-2 rounded-xl bg-white-100 dark:bg-white-10 dark:backdrop-blur-sm shadow-sm border border-black-0`}
    >
      <SettingItem
        onClick={() => handleDeletePost()}
        name="Supprimer"
        icon="bi bi-dash"
      />
      <SettingItem
        onClick={() => handleEditPost()}
        name="Modifier"
        icon="bi bi-pencil"
      />
      <SettingItem
        onClick={() => handleExpirePost()}
        name="Rendre Indisponible"
        icon="bi bi-arrows"
      />
    </div>
  );
};

const SettingItem = ({ name, icon, onClick }) => {
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
