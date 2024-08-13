/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import ProfileImage from "../../../assets/images/OIP.jpg";
import React, { useEffect, useRef, useState } from "react";
import Button from "../../ui/Button.jsx";
import { Icon } from "../../../styles/components.js";
import { useApp } from "../../../context/AppProvider.jsx";
import { SERVERLINK } from "../../../constants/index.js";
import { useAnimation } from "framer-motion";
import OfferCardLoading from "../../loader/OfferCardLoading.jsx";
import { TOAST_TYPE } from "../../../constants/index.js";
import { useAuth } from "../../../context/AuthProvider.jsx";
import { useOffer } from "../../../context/OfferProvider.jsx";
import Badge from "../../ui/Badge.jsx";
import { useUser } from "../../../context/UserProvider.jsx";

const offerDetails = `Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet Lorem ipsum
              dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit
              amet, Lorem ipsum dolor
              Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet`;

const MAX_OFFER_DESC = 130;

const OfferCard = ({
  className,
  saved = false,
  sug,
  forCurrentUser = false,
  detailedProfile = true,
}) => {
  const [detailed, setDetailed] = useState(false);
  const [loading, setLoading] = useState(true);
  const [popupVisible, setPopupVisible] = useState(false);
  const { timeSince } = useApp();
  const { goToUserProfile } = useUser();
  
  const { saveOffer, retireOffer, getSavedOffers } = useOffer();

  const navigate = useNavigate();
  const image = SERVERLINK + "/" + sug?.profileimage;

  const offerImage = SERVERLINK + "/" + sug?.imgurl;

  const handleClick = () => {
    localStorage.setItem(
      "userToChat",
      JSON.stringify({
        id: sug?.userid,
        fullName: sug?.firstname + " " + sug?.lastname,
        accounttype: sug?.accounttype,
        pic: image,
      })
    );
    navigate("/message");
  };

  const handleSaveOffer = async () => {
    await saveOffer(await sug?.offerid);
    await getSavedOffers();
  };

  const handleRevokeSavedOffer = async () => {
    await retireOffer(sug?.offerid);
    await getSavedOffers();
  };

  const toggleOfferCardPopup = () => {
    setPopupVisible((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-start justify-start w-full gap-2 ">
      <div className="flex items-center gap-x-6 gap-y-2 flex-wrap">
        <Badge text={sug?.title} icon="bi bi-box" />
        <Badge text={sug?.depart + " vers " + sug?.dest} icon="bi bi-map" />
        <Badge
          text={
            "Prévue le " + new Date(sug?.scheduleddate).toLocaleDateString()
          }
          icon="bi bi-calendar2-event"
        />
        <Badge text={sug?.capacity} icon="bi bi-truck" />
      </div>
      <div
        className={`relative flex flex-col gap-3 w-full items-center ${className} bg-white-100  dark:bg-black-100 dark:text-white-100 dark:font-sm dark:bg-white-10 dark:border-none rounded-xl p-4 max-md:p-2 border border-black-0`}
      >
        {popupVisible && (
          <div className="absolute top-10 right-10">
            <OfferCardPopup setPopupVisible={setPopupVisible} offer={sug} />
          </div>
        )}
        <div className="w-full flex items-center justify-between rounded-2xl">
          <div className="flex items-center gap-2">
            <img
                onClick={() => navigate(`/profile/${sug.userid}`)}
              className="size-[40px] object-cover rounded-full cursor-pointer"
              src={image}
            />
            <div className="flex flex-col items-start">
              <p className="text-small-1 font-md cursor-pointer hover:underline" onClick={() => navigate(`/profile/${sug.userid}`)}>
                {sug?.firstname + (!sug?.lastname ? "" : sug?.lastname)}
              </p>
              <span className=" dark:font-sm text-small-2">
                {sug?.accounttype}
              </span>
              <div className="flex items-center gap-2  dark:text-white-100 text-black-80 ">
                <i className="bi bi-clock"></i>
                <span className="text-small-2  ">
                  {timeSince(sug?.publicationdate, 4)}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2 items-center">
            
              <Icon
                onClick={() => toggleOfferCardPopup()}
                size="sm"
                variant="ghost"
                icon="bi bi-three-dots-vertical"
              />
            
          </div>
        </div>
        <div className="w-full flex flex-col gap-4 items-start justify-cente  rounded-2xl  ">
            <p className="text-small-1 text-black-100 dark:text-white-100 dark:font-sm ">
              {
                offerDetails.length > MAX_OFFER_DESC ? (
                    detailed ? offerDetails : (offerDetails.slice(0,MAX_OFFER_DESC) + " ...")
                ) : offerDetails
              }
            </p>

          {
              offerDetails.length > MAX_OFFER_DESC && <button
                  className="flex gap-1 items-center"
                  onClick={() => setDetailed((prev) => !prev)}
              >
                {/*<i className={`bi bi-chevron-${detailed ? 'up' : 'down'}`}></i>*/}
                <p className="underline text-small-2 text-black-100 dark:text-white-80">
                  {detailed ? "Moin" : "Plus"} de details
                </p>
              </button>
          }
        </div>
        {detailedProfile && (
            <img
                src={offerImage}
                className="w-full h-[256px] object-cover rounded-md"
            />
        )}
        {!forCurrentUser && (
            <div className="flex items-center w-full gap-6 jusify-start flex-wrap">
              {/*<Icon variant="secondary" icon="bi bi-chat" size="sm"/>*/}
              <Button
                  onClick={handleClick}
              size="sm"
              variant="secondary"
              icon="bi bi-chat"
              block              
            >
              Contacter
            </Button>
            {/* {saved ? (
              <Button
                onClick={handleRevokeSavedOffer}
                size="sm"
                variant="danger"
                icon="bi bi-bookmark-dash"
                rounded="full"
              >
                Retirer de la sauvegarde
              </Button>
            ) : (
              <Button
                size="sm"
                variant="secondary"
                icon="bi bi-bookmark"
                rounded="full"
                onClick={handleSaveOffer}
              >
                Sauvegarder
              </Button>
            )} */}
          </div>
        )}
      </div>
    </div>
  );
};
export default OfferCard;

const OfferCardPopup = ({ setPopupVisible, offer }) => {
  const { setMessagePopup } = useAnimation();

  const { getOfferById, getCurrentUserOffers, setUpdateOffer, setUnavalaibleOffer, setAvalaibleOffer, deleteOffer } = useOffer();

  const { token } = useAuth();

  const selectRef = useRef(null);

  const handleDeletePost = async () => {
    // TODO :
    deleteOffer(offer.offerid);
    getCurrentUserOffers();
    localStorage.removeItem("offer");
    setUpdateOffer();

    // - Deleting the post
    // setPopupVisible(false);
    // setMessagePopup("Offre supprimé avec success", TOAST_TYPE.success);
  };

  const handleEditPost = () => {
    // TODO :
    getOfferById(offer.offerid);
    localStorage.setItem('offer', JSON.stringify(offer))
    // - Editing the post
    setPopupVisible(false);
  };

  const handleExpirePost = () => {
    // TODO :
    setUnavalaibleOffer(offer.offerid);
    getCurrentUserOffers();
    setPopupVisible(false);
    // setMessagePopup(
    //   "L'offre est maitenant rendu indisponible",
    //   TOAST_TYPE.success
    // );
  };

  const handleUnexpirePost = () => {
    // TODO :
    setAvalaibleOffer(offer.offerid);
    getCurrentUserOffers();
    setPopupVisible(false);
    // setMessagePopup(
    //   "L'offre est maitenant rendu indisponible",
    //   TOAST_TYPE.success
    // );
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
      className={`flex select-none flex-col items-center justify-center gap-4 w-[230px] p-2 rounded-xl bg-white-100 dark:bg-white-0 dark:backdrop-blur-sm shadow-sm border border-black-0`}
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
      {
        offer.dispo ?
      <SettingItem
        onClick={() => handleExpirePost()}
        name="Rendre Indisponible"
        icon="bi bi-repeat"
      />
          :
          <SettingItem
            onClick={() => handleUnexpirePost()}
            name="Rendre Disponible"
            icon="bi bi-circle"
          />
      }
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
