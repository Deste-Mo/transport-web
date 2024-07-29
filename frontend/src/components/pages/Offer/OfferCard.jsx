import { useNavigate } from 'react-router-dom'
import ProfileImage from "../../../assets/images/OIP.jpg";
import OfferImage from "../../../assets/images/voiture.jpg";
import React, { useState } from "react";
import Button from "../../ui/Button.jsx";
import { Icon } from "../../../styles/components.js";
import OfferDetailBadge from "./OfferDetailBadge.jsx";
import { useApp } from '../../../context/AppPorvider.jsx';
import { SERVERLINK } from '../../../constants/index.js';

const OfferCard = ({ className, saved = false, sug }) => {

    const [detailed, setDetailed] = useState(true);


    const navigate = useNavigate()

    const { timeSince } = useApp();

    const image = SERVERLINK + "/" + sug.profileimage;

    const offerImage = SERVERLINK + "/" + sug.imgurl;

    const handleClick = () => {
        localStorage.setItem('userToChat', JSON.stringify({ id: sug.userid, fullName: sug.firstname + " " + sug.lastname, accounttype: sug.accounttype, pic: image }))
        navigate('/message')
    }



    return (
        <div className="flex flex-col items-start justify-start w-full gap-2">
            <div className="flex items-center gap-x-6 gap-y-2 flex-wrap">
                <OfferDetailBadge text={sug.title} icon="bi bi-box" />
                <OfferDetailBadge text={sug.depart + " vers " + sug.dest} icon="bi bi-map" />
                <OfferDetailBadge text={"Prévue le " + new Date(sug.scheduleddate).toLocaleDateString()} icon="bi bi-calendar2-event" />
                <OfferDetailBadge text={sug.capacity} icon="bi bi-truck" />
            </div>
            <div
                className={`flex flex-col gap-3 w-full items-center ${className} bg-white-100 rounded-xl p-4 border border-black-0`}>
                <div
                    className="w-full flex items-center justify-between bg-white-100 rounded-2xl">
                    <div className="flex items-center gap-2">
                        <img className="size-[40px] object-cover rounded-full" src={image} />
                        <div className="flex flex-col items-start">
                            <p className="text-black-100 text-small-1">{sug.firstname + (!sug.lastname ? '' : sug.lastname)}</p><span
                                className="text-black-100 text-small-2">{sug.accounttype}</span>
                            <div className="flex items-center gap-2">
                                <i className="bi bi-clock"></i>
                                <span
                                    className="text-black-80 text-small-2 ">{timeSince(sug.publicationdate, 4)}
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <Icon size="sm" variant="ghost" icon="bi bi-three-dots-vertical" />
                    </div>
                </div>
                <div
                    className="w-full flex flex-col gap-4 items-start justify-cente bg-white-100 rounded-2xl  ">
                    {
                        detailed &&
                        <p className="text-small-1 text-black-100 ">
                            {sug.description}
                        </p>
                    }
                    <button className="flex gap-1 items-center" onClick={() => setDetailed(prev => !prev)}>
                        {/*<i className={`bi bi-chevron-${detailed ? 'up' : 'down'}`}></i>*/}
                        <p className="underline text-small-2">{detailed ? "Moin" : "Plus"} de details</p>
                    </button>
                </div>
                <img src={offerImage} className="w-full h-[256px] object-cover rounded-xl" />
                <div className="flex items-center w-full gap-6 jusify-start">
                    {/*<Icon variant="secondary" icon="bi bi-chat" size="sm"/>*/}
                    <Button onClick={handleClick} size='sm' variant="secondary" icon="bi bi-chat" rounded="full">Contacter</Button>
                    {
                        saved ? (
                            <Button size="sm" variant="danger" icon="bi bi-bookmark-dash" rounded="full">Retirer</Button>

                        ) : (
                            <Button size="sm" variant="secondary" icon="bi bi-bookmark" rounded="full">Sauvegarder</Button>

                        )
                    }
                </div>
            </div>
        </div>
    )
}


export default OfferCard;
