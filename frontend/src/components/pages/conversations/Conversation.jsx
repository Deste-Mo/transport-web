import { useNavigate } from "react-router-dom"
import React, { useEffect, useState } from "react";
import {useAuth} from "../../../context/AuthProvider.jsx";
import {SERVERLINK} from "../../../constants/index.js";
import {useSocketContext} from "../../../context/SocketContext.jsx";
import ProfileImage from "../../../assets/images/OIP.jpg";

const Conv = ({ id, userToChat }) => {

    const navigate = useNavigate();

    const { token } = useAuth();

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
        <div className={`flex items-center justify-between cursor-pointer w-full hover:bg-primary-20 p-6 rounded-xl ${isViewed ? 'bg-white-100' : 'bg-primary-20'}`} onClick={handleClick}>
            <div className="flex items-center gap-2">
                <img className="size-[40px] object-cover rounded-full" src={image || '../../assets/images/OIP.jpg'}/>
                <div className="flex flex-col gap-1 items-start">
                    <p className="text-black-100 text-small-1">{userToChat.firstname + " " + userToChat.lastname}  ({userToChat.accounttype})</p>
                    <p className={`${isViewed ? 'text-black-80' : 'text-black-100 font-bold'} text-small-1`}>
                        Lorem ipsum dolor sit amet
                    </p>
                </div>
            </div>
            <div className="flex items-center gap-1">
                <div className={`size-[10px] rounded-full ${isViewed ? "bg-black-60" : "bg-primary-100"}`}
                ></div>
                <p className={"text-small-2 text-black-80 font-light"}>Il y a 10 min</p>
            </div>
        </div>
    )
}

export default Conv;