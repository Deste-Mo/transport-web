import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import { useApp } from "../../context/AppPorvider";
//import PropTypes from "prop-types";



export const ProfileLeft = ({ name, account, profile = false, email, image, phone, date, onClick }) => {

    const navigate = useNavigate();

    const { countFollow, handleCountFollow, pubNumber } = useApp()


    useEffect(() => {
        handleCountFollow()
    }, [countFollow, handleCountFollow]);

    return (
        <div className="flex flex-col gap-6 rounded-xl shadow-sm border border-black-0 p-4 bg-white-100 w-full">
            <div className={profile ? "flex justify-between items-start" : null}>
                {profile && <i className="disabled:bi-0-circle"></i> }
                <div className="flex flex-col items-center justify-center gap-4">
                    <img src={image} alt="" className={`${profile ? 'size-[128px]' : 'size-[84px]'} bg-black-20 rounded-full`} />
                    <div className="flex flex-col gap-1 items-center justify-center text-lead">
                        <span>{name}</span>
                        <span className="text-black-60 text-small-1 font-light">{account}</span>
                    </div>
                </div>
                {profile && <i className="bi bi-three-dots-vertical"></i>}
            </div>
            <div className={`flex gap-4 text-base text-black-100 ${!profile ? "flex-col" : "items-center justify-between"}`}>
                <div className="flex items-center justify-between  gap-2">
                    {profile && <i className="bi bi-envelope-at"></i>}
                    {profile ? <span>{email}</span> : <span>Publication</span>}
                    {!profile && <span className="">{ pubNumber }</span>}
                </div>
                <div className="flex items-center  justify-between gap-2">
                    {profile && <i className="bi bi-phone-flip"></i>}
                    {profile ? <span>{phone}</span> : <span>Amis</span>}
                    {!profile && <span className="">{countFollow}</span>}
                </div>
                {profile &&
                    <div className="flex items-center justify-between gap-2">
                        <i className="bi bi-calendar"></i>
                        <span>{date}</span>
                    </div>
                }
            </div>
            {profile ? <Button block size="md" icon="bi bi-pencil" onClick={() => navigate(`profile/edit/1`)} >Modifier les informations</Button> : <Button block variant="secondary" onClick={() => navigate("/profile")}>Voir mon profile</Button>}
        </div>
    )
}
