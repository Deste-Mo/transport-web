/* eslint-disable react/no-children-prop */
/* eslint-disable react/prop-types */
import {useNavigate, useParams} from "react-router-dom";
import ProfileImage from "../../../assets/images/OIP.jpg";
import React, {useEffect, useRef, useState} from "react";
import Button from "../../ui/Button.jsx";
import {Icon} from "../../../styles/components.js";
import {useApp} from "../../../context/AppProvider.jsx";
import {SERVERLINK} from "../../../constants/index.js";
import {useAnimation} from "../../../context/AnimationProvider.jsx";
import OfferCardLoading from "../../loader/OfferCardLoading.jsx";
import {TOAST_TYPE} from "../../../constants/index.js";
import {useAuth} from "../../../context/AuthProvider.jsx";
import {useOffer} from "../../../context/OfferProvider.jsx";
import Badge from "../../ui/Badge.jsx";
import {useUser} from "../../../context/UserProvider.jsx";
import TemplatePopup, {OptionItem} from "../../ui/TemplatePopup.jsx";

const MAX_OFFER_DESC = 130;

const OfferCard = ({
                       className,
                       saved = false,
                       sug,
                       forCurrentUser = false,
                       detailedProfile = true,
                       njcam = false,
                       isInProfileDetails = false,
                   }) => {
    const [detailed, setDetailed] = useState(false);
    const [isEnable, setEnable] = useState(sug?.dispo);
    const [popupVisible, setPopupVisible] = useState(false);
    const {timeSince, showConfirmPopup} = useApp();
    const {saveOffer, retireOffer, getSavedOffers, offer} = useOffer();
    const navigate = useNavigate();
    const image = SERVERLINK + "/" + sug?.profileimage;
    const offerImage = SERVERLINK + "/" + sug?.imgurl;
    const offerDetails = sug?.description ? sug?.description : `Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet Lorem ipsum
              dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit
              amet, Lorem ipsum dolor
              Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet`;
    const {setMessagePopup} = useAnimation();

    const {
        getOfferById,
        getCurrentUserOffers,
        setUpdateOffer,
        setUnavalaibleOffer,
        setAvalaibleOffer,
        deleteOffer,
    } = useOffer();

    const {token} = useAuth();
    
    const contactUser = () => {
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

    const {id} = useParams();

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
    
    const NJCAM = {
        Infos: "Njcam est une entrprise qui prend en charge la vente de Camera de securite et la surveillance Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet et blanditiis eaque, enim vitae perspiciatis. Porro minus iusto voluptatem, ducimus nemo autem cum, placeat iste nostrum tempora quibusdam quia commodi",
        Image: SERVERLINK + '/njcamlogo.jpg',
        ImageOffer: SERVERLINK + '/njcamoffer.jpg',
        Link: 'https://facebook.com'
    }
    const handleDeletePost = async () => {
        // TODO :
        
        const userConfirmed = await showConfirmPopup("Voulez vous vraiment supprimer cette offre ?")
        if (!userConfirmed)
            return
        
        await deleteOffer(sug.offerid);
        await getCurrentUserOffers();
        localStorage.removeItem("offer");
        setUpdateOffer();

        setMessagePopup("Offre supprimé avec success", TOAST_TYPE.success);
    };

    const handleEditPost = () => {
        // TODO :
        getOfferById(sug.offerid);
        localStorage.setItem("offer", JSON.stringify(sug));
        navigate(`/profile/${id}/editOffer`)
        // - Editing the post
        setPopupVisible(false);
    };

    const handleExpirePost = async () => {
        // TODO :
        await setUnavalaibleOffer(sug.offerid);
        await getCurrentUserOffers();
        setPopupVisible(false);
        setEnable(false);
        setMessagePopup("L'offre actuellement indisponible", TOAST_TYPE.success);

    };

    const handleUnexpirePost = async () => {
        // TODO :
        await setAvalaibleOffer(sug.offerid);
        await getCurrentUserOffers();
        setPopupVisible(false);
        setEnable(true);
        setMessagePopup("L'offre est disponible maintenant! ", TOAST_TYPE.success);
    };

    return (
        <div className="flex flex-col items-start justify-start w-full gap-2 ">
            <div
                className={`relative flex flex-col gap-6 w-full items-center ${className}    dark:text-white-100 bg-secondary-l dark:font-sm dark:bg-secondary-d dark:border-none rounded-xl p-4 max-md:p-2 border border-black-0`}
            >
                {popupVisible && (
                    <div className="absolute top-10 right-10">
                        {forCurrentUser ? (
                            <TemplatePopup
                                popupVisible={popupVisible}
                                setPopupVisible={setPopupVisible}

                                children={
                                    <>

                                        <OptionItem
                                            onClick={() => handleEditPost()}
                                            name="Modifier"
                                            icon="bi bi-pencil"
                                            setPopupVisible={setPopupVisible}
                                        />
                                        <OptionItem
                                            onClick={() => handleDeletePost()}
                                            name="Supprimer"
                                            icon="bi bi-dash"
                                            setPopupVisible={setPopupVisible}
                                        />
                                        {sug?.dispo ? (
                                            <OptionItem
                                                onClick={() => handleExpirePost()}
                                                name="Rendre Indisponible"
                                                icon="bi bi-repeat"
                                                setPopupVisible={setPopupVisible}
                                            />
                                        ) : (
                                            <OptionItem
                                                onClick={() => handleUnexpirePost()}
                                                name="Rendre Disponible"
                                                icon="bi bi-circle"
                                                setPopupVisible={setPopupVisible}
                                            />
                                        )}
                                    </>
                                }
                            />
                        ) : (
                            <TemplatePopup
                                setPopupVisible={setPopupVisible}
                                popupVisible={popupVisible}
                                className={'z-40'}
                                children={
                                    <>
                                        <OptionItem
                                            onClick={contactUser}
                                            name="Contacter"
                                            icon="bi bi-chat"
                                            setPopupVisible={setPopupVisible}
                                        />
                                        {saved ? (
                                            <OptionItem
                                                onClick={handleRevokeSavedOffer}
                                                name="Retirer de la sauvegarde"
                                                icon="bi bi-bookmark-dash"
                                                setPopupVisible={setPopupVisible}
                                            />
                                        ) : (
                                            <OptionItem
                                                onClick={handleSaveOffer}
                                                name="Sauvegarder"
                                                icon="bi bi-bookmark"
                                                setPopupVisible={setPopupVisible}
                                            />
                                        )}
                                    </>
                                }
                            />
                        )}
                    </div>
                )}
                {
                    !njcam &&
                    <div className="flex items-start  w-full justify-start gap-x-4 gap-y-2 flex-wrap">
                        <OfferDetail text={sug?.title} icon="bi bi-box"/>
                        <OfferDetail text={sug?.depart + " vers " + sug?.dest} icon="bi bi-map"/>
                        <OfferDetail
                            text={
                                "Prévue le " + new Date(sug?.scheduleddate).toLocaleDateString()
                            }
                            icon="bi bi-calendar2-event"
                        />
                        <OfferDetail text={sug?.capacity} icon="bi bi-truck"/>
                    </div>
                }
                <div className="w-full flex items-center justify-between rounded-2xl">
                    
                    <div className="flex items-center gap-2">
                        {
                            !njcam ?
                                <img
                                    onClick={() => navigate(`/profile/${sug.userid}`)}
                                    className="size-[40px] object-cover rounded-full cursor-pointer"
                                    src={image}
                                />
                                :
                                <a href={NJCAM.Link}>
                                    <img
                                        className="size-[40px] object-cover rounded-full cursor-pointer"
                                        src={NJCAM.Image}
                                    />
                                </a>
                        }
                        <div className="flex flex-col items-start">
                            {
                                !njcam ?
                                    <p
                                        className="text-base font-bold  cursor-pointer hover:underline"
                                        onClick={() => navigate(`/profile/${sug.userid}`)}
                                    >
                                        {sug?.firstname + ' ' + (!sug?.lastname ? "" : sug?.lastname)}
                                    </p>
                                    :
                                    <a href={NJCAM.Link}>
                                        <p
                                            className="text-small-1 font-md cursor-pointer hover:underline"
                                        >
                                            {'NJCAM System Security'}
                                        </p>
                                    </a>
                            }
                            <span className=" dark:font-sm text-small-2">
                                {!njcam ? sug?.accounttype : 'Entreprise'}
                            </span>
                            {
                                !njcam &&
                                <div className="flex items-center gap-2  dark:text-text-sec-d text-text-sec-l">
                                    <i className="bi bi-clock"></i>
                                    <span className="text-small-2  ">
                                        {timeSince(sug?.publicationdate, 4)}
                                    </span>
                                </div>
                            }
                        </div>
                    </div>
                    {
                        !njcam &&
                        <div className="flex gap-2 items-center">
                            {
                                isInProfileDetails &&
                                    <Badge text={isEnable ? "Disponible" : "Indisponible"} icon="bi bi-clock" />
                            }
                            <Icon
                                onClick={() => toggleOfferCardPopup()}
                                size="sm"
                                variant="ghost"
                                icon="bi bi-three-dots-vertical"
                            />
                        </div>
                    }
                </div>
                <div onClick={() => setDetailed((prev) => !prev)} className="w-full flex flex-col gap-4 items-start justify-cente  rounded-2xl  ">
                    <p className="text-small-1 text-text-sec-l dark:text-text-sec-d dark:font-sm ">
                        {!njcam ? (offerDetails.length > MAX_OFFER_DESC
                                ? detailed
                                    ? offerDetails
                                    : offerDetails.slice(0, MAX_OFFER_DESC) + " ..."
                                : offerDetails)
                            :
                            (NJCAM.Infos.length > MAX_OFFER_DESC
                                ? detailed
                                    ? NJCAM.Infos
                                    : NJCAM.Infos.slice(0, MAX_OFFER_DESC) + " ..."
                                : NJCAM.Infos)
                        }
                    </p>
                    

                    {offerDetails.length > MAX_OFFER_DESC && (
                        <button
                            className="flex gap-1 items-center"
                            onClick={() => setDetailed((prev) => !prev)}
                        >
                            {/*<i className={`bi bi-chevron-${detailed ? 'up' : 'down'}`}></i>*/}
                            <p className="underline text-small-2 text-black-100 dark:text-white-80">
                                {detailed ? "Moin" : "Plus"} de details
                            </p>
                        </button>
                    )}
                </div>
                {((detailedProfile && sug?.imgurl != null) || njcam) && (
                    <div className="w-full h-[257px]">
                        {
                            !njcam ?
                                <img
                                    src={offerImage}
                                    className="w-full h-full object-cover rounded-md"
                                />
                                :
                                <a href={NJCAM.Link}>
                                    <img
                                        src={NJCAM.ImageOffer}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                </a>
                        }
                    </div>

                )}
                {!forCurrentUser && (
                    <div className="flex items-center w-full gap-6 jusify-start flex-wrap">
                        {/*<Icon variant="secondary" icon="bi bi-chat" size="sm"/>*/}
                        {
                            !njcam ?
                                <Button
                                    onClick={contactUser}
                                    variant="primary"
                                    // icon="bi bi-chat"
                                >
                                    Contacter
                                </Button>
                                :
                                <a href={NJCAM.Link}>
                                    <Button
                                        variant="primary"
                                        // icon="bi bi-chat"
                                        
                                    >
                                        Contacter
                                    </Button>
                                </a>
                        }
                    </div>
                )}
            </div>
        </div>
    )
        ;
};

const OfferDetail = (
    {
        icon,
        text,
        active = false,
        onClick = () => { },
        badgeClassName,
        iconClassName
    }) => {
    return (
        <div
            onClick={onClick}
            className={` ${active && "bg-accent-l/20 dark:bg-accent-d/20"
            } text-small-2 rounded-full cursor-pointer px-4 py-2  flex gap-2 select-none    group bg-primary-d/5 dark:bg-primary-l/10  ${badgeClassName}`}
        >
            {icon && (
                <i
                    className={`${icon} ${active && "text-black-100 dark:text-white-100"
                    } text-primary-100  ${iconClassName}`}
                ></i>
            )}
            <p>{text}</p>
        </div>
    );
};

export default OfferCard;
