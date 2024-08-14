/* eslint-disable react/prop-types */
import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
import {Icon} from "../../styles/components.js";
import { useApp } from "../../context/AppPorvider.jsx";
import { useAuth } from "../../context/AuthProvider.jsx";
import { SERVERLINK } from "../../constants/index.js";
import { useNotification } from "../../context/NotficationProvider.jsx";
import { useUser } from "../../context/UserProvider.jsx";

export function Notification({notification, spec, icon = false, viewed = false}) {

    const [vues, setVues] = useState(false);
    const { token } = useAuth();
    const { timeSince } = useApp();
    const {goToUserProfile} = useUser();

    const notifid = spec;

    const { getNotifications, getUnreadNotifications } = useNotification()
    const navigate = useNavigate()

    const handleViewed = async () => {
        const response = await fetch(SERVERLINK + "/api/notifs/viewnotifs/" + notifid, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })

        const verification = await response.json();

        setVues(await verification.view);

        getNotifications();
        getUnreadNotifications();
    }

    const handleDelete = async () => {
        const response = await fetch(SERVERLINK + "/api/notifs/delnotif/" + notifid, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "token": token
            }
        })

        const verification = await response.json();

        getNotifications();
        getUnreadNotifications();
    }

    useEffect(() => {
        setVues(notification.viewed);
    }, [viewed]);
    
    const handleClick = () => {
        notification.link && localStorage.setItem("offerNotifId", notification.link);
        !vues && handleViewed();
        goToUserProfile(notification.senderid);
    }
    
    return (
        <div 
             className={`flex flex-col gap-6 rounded-xl p-4  group transition-color duration-300  border  ${notification.viewed || vues ? "bg-white-100 border-black-0 dark:bg-white-10 dark:border-none" : "bg-primary-40 border-primary-40"}`}>
            <div className="flex items-center justify-between w-full">
                <div className="flex items-start gap-2 flex-col" onClick={handleClick}>
                    <p className="text-base text-black-100 dark:text-white-100 group-hover:underline cursor-pointer">{notification.content}</p>
                    <div className="flex  gap-1  justify-start items-center">
                        <div className={`size-2 rounded-full ${viewed || vues ? 'bg-black-60' : 'bg-primary-100'}`}></div>
                        <p className="text-small-1 text-black-60 dark:text-white-100 dark:font-sm">{timeSince(notification.notifdate, 2)}</p>
                    </div>

                </div>
                {icon && <Icon icon="bi bi-x" onClick={handleDelete} variant="secondary" size="sm" />}
            </div>
        </div>
    )
}
