/* eslint-disable no-unused-vars */
import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react";
import { useAuth } from "../../../context/AuthProvider.jsx";
import { SERVERLINK } from "../../../constants/index.js";
import { useSocketContext } from "../../../context/SocketContext.jsx";
import ProfileImage from "../../../assets/images/OIP.jpg";
import { useApp } from "../../../context/AppPorvider.jsx";

const Conv = ({ id, userToChat }) => {
    const navigate = useNavigate();

    const { token, personalInformation } = useAuth();

    const { timeSince } = useApp();

    const image = SERVERLINK + "/" + userToChat?.profileimage;

    const [isViewed, setViewed] = useState(false);

    const handleClick = () => {
        localStorage.setItem('userToChat', JSON.stringify({ id: userToChat.userid, fullName: userToChat.firstname + " " + userToChat.lastname, accounttype: userToChat.accounttype, pic: image }))
        navigate('/message')
    }

    const { ActiveUsers } = useSocketContext();

    const isOnline = ActiveUsers.includes(userToChat.userid);

    useEffect(() => {

        // console.log(ActiveUsers);
        const verifyStatus = async () => {

            const response = await fetch(SERVERLINK + "/api/messages/seen/" + userToChat.userid, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "token": token
                }
            })

            const verification = await response.json();

            setViewed(await verification.allSeen);
        }
        verifyStatus();
    }, [])

    return (
        <div className={`flex select-none items-center justify-between cursor-pointer w-full hover:bg-primary-20 p-6 rounded-xl ${isViewed ? 'bg-white-100' : 'bg-primary-20'}`} onClick={handleClick}>
            <div className="flex items-center gap-2">
                <div className="relative">
                    <img className="size-[40px] object-cover rounded-full" src={image || '../../assets/images/OIP.jpg'} />
                    {isOnline ? <span className="h-[10px] w-[10px] rounded-[50%] ml-2 bg-success-100 absolute top-0 right-0 block" ></span> : null}
                </div>
                <div className="flex flex-col gap-1 items-start">
                    <p className="text-black-150 text-small-1">{userToChat.firstname + " " + userToChat.lastname}  ({userToChat.accounttype})</p>
                    <p className={`${isViewed ? 'text-black-80' : 'text-black-100 font-bold'} text-small-1 flex items-center gap-1`}>
                        <span>
                            {personalInformation.id === userToChat.lastsender ? "Vous : " : "Nouveau : "}
                        </span>
                        <span className="max-w-[150px] overflow-hidden">
                            {" " + userToChat.lastmessage}
                        </span>
                        <span>...</span>
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <div className={`size-[10px] rounded-full ${isViewed ? "bg-black-60" : "bg-primary-100"}`}
                ></div>
                <p className={"text-small-2 text-black-80 font-light"}>{timeSince(userToChat.lastdate, 3)}</p>
            </div>
        </div>
    )
}

export default Conv;