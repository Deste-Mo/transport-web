import {useNavigate} from 'react-router-dom'
import ProfileImage from "../../../assets/images/OIP.jpg";
import OfferImage from "../../../assets/images/voiture.jpg";
import React, {useState} from "react";
import Button from "../../ui/Button.jsx";

const OfferCard = ({className}) => {

    const [detailed, setDetailed] = useState(false);

    const navigate = useNavigate()

    return (
        <div className={`flex flex-col gap-3 w-full items-center ${className}`}>
            <div
                className="w-full flex items-center justify-between bg-white-100 rounded-2xl py-4 px-6 border border-black-20">
                <div className="flex items-center gap-2">
                    <img className="size-[56px] object-cover rounded-full" src={ProfileImage}/>
                    <div className="flex flex-col gap-2 items-start">
                        <p className="text-black-100 text-small-1">RAHARISOA Haingonirina</p>
                        <div>
                            <i className="bi bi-alarm"></i>
                            <span
                                className="text-black-80 text-small-2 italic"> Il y a 30 minutes
                                </span>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-2 items-center">
                    <p className="text-black-100 text-small-1">Entreprise</p>
                </div>
            </div>
            <div
                className="w-full flex flex-col gap-4 items-center justify-center bg-white-100 rounded-2xl py-4 px-6 border border-black-20">
                <h3 className="text-black-100 font-bold text-lead">Marchandise à transporter</h3>
                <div className="w-full border border-black-10"></div>
                <div className="flex w-full items-center justify-between">
                    <OfferDetailBadge text="De Fianarantsoa vers Tananarive" icon="bi bi-map"/>
                    <OfferDetailBadge text=" Prévue le 04 août 2024" icon="bi bi-calendar2-event"/>
                    <OfferDetailBadge text="5 Tonnes" icon="bi bi-truck"/>
                </div>
                {
                    detailed &&
                    <p className="text-small-1 text-black-80 ">
                        Lorem ipsum dolor sit amet,
                        Lorem ipsum dolor sit amet
                        Lorem ipsum dolor sit amet
                        Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet,
                        Lorem ipsum dolor sit amet
                        Lorem ipsum dolor sit amet
                        Lorem ipsum dolor sit amet
                    </p>
                }
                <button className="flex gap-1 items-center" onClick={() => setDetailed(prev => !prev)}>
                    <i className={`bi bi-chevron-${detailed ? 'up' : 'down'}`}></i>
                    <p className="text-small-2">{detailed ? "Moin" : "Plus"} de details</p>
                </button>
            </div>
            <img src={OfferImage} className="w-full h-[256px] object-cover rounded-2xl"/>
            <Button block icon="bi bi-chat-dots">Contacter</Button>
        </div>
    )
}

const OfferDetailBadge = ({icon, text}) => {
    return (
        <p className=" text-small-1">
            <i className={icon}></i> {text}
        </p>
    )
}

export default OfferCard;
