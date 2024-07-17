import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";
import { useEffect, useState } from "react";
import { useApp } from "../../context/AppPorvider";
//import PropTypes from "prop-types";



export const ProfilLeft = ({ name, account, profile = false, email, image, phone, date, onClick }) => {

    const navigate = useNavigate();

    const { countFollow, handleCountFollow } = useApp()


    useEffect(() => {
        handleCountFollow()
    }, [countFollow, handleCountFollow]);

    return (
        <div className="flex flex-col gap-6 rounded-lg p-4 bg-white-100 w-full">
            <div className={profile ? "flex justify-between items-start" : null}>
                {profile ? <i className="disabled:bi-0-circle"></i> : null}
                <div className="flex flex-col items-center justify-center">
                    <img src={image} alt="" className="h-16 w-16 rounded-full" />
                    <span>{name}</span>
                    <span className="text-primary-100">{account}</span>
                </div>
                {profile ? <i className="bi bi-three-dots-vertical"></i> : null}
            </div>
            <div className={`flex gap-4 ${!profile ? "flex-col" : "items-center justify-between"}`}>
                <div className="flex items-center justify-between gap-2">
                    {profile ? <i className="bi bi-envelope-at"></i> : null}
                    {profile ? <span>{email}</span> : <span>Publication</span>}
                    {!profile ? <span className="rounded-lg p-2 bg-primary-40">32</span> : null}
                </div>
                <div className="flex items-center justify-between gap-2">
                    {profile ? <i className="bi bi-phone-flip"></i> : null}
                    {profile ? <span>{phone}</span> : <span>Amis</span>}
                    {!profile ? <span className="rounded-lg p-2 bg-primary-40">{countFollow}</span> : null}
                </div>
                {profile ?
                    <div className="flex items-center justify-between gap-2">
                        <i className="bi bi-calendar"></i>
                        <span>{date}</span>
                    </div>
                    : null}
            </div>
            {profile ? <Button block onClick={onClick} >Modifier les informations</Button> : <Button block variant="secondary" onClick={() => navigate("/profile")}>Voir mon profil</Button>}
        </div>
    )
}

/*
ProfilLeft.propTypes = {
    name: PropTypes.string.isRequired,
    account: PropTypes.string.isRequired,
  };
  */
