import {useEffect, useState} from "react"
import {useNavigate} from "react-router-dom";
import {Icon} from "../../styles/components.js";
import { useApp } from "../../context/AppPorvider.jsx";
import { useAuth } from "../../context/AuthProvider.jsx";
import { SERVERLINK } from "../../constants/index.js";

export function Notification({propos, date, spec, icon = false, viewed = false}) {

    const [vues, setVues] = useState(false);
    const notifid = spec;
    const { token } = useAuth();
    const { handleNotificationShow, timeSince, handleCountNotifUnread } = useApp();
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

        handleNotificationShow();
        handleCountNotifUnread();
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

        handleNotificationShow();
        handleCountNotifUnread();
    }

    useEffect(() => {
        setVues(viewed)
    }, [viewed]);
    
    return (
        <div onClick={!vues && handleViewed}
             className={`flex flex-col gap-6 rounded-xl p-4  group transition-color duration-300  border  ${viewed ? "bg-white-100 border-black-0 dark:bg-white-10 dark:border-none" : "bg-primary-40 border-primary-40"}`}>
            <div className="flex items-center justify-between w-full">
                <div className="flex items-start gap-2 flex-col">
                    <p className="text-base text-black-100 dark:text-white-100 group-hover:underline cursor-pointer">{propos}</p>
                    <div className="flex  gap-1  justify-start items-center">
                        <div className={`size-2 rounded-full ${viewed ? 'bg-black-60' : 'bg-primary-100'}`}></div>
                        <p className="text-small-1 text-black-60 dark:text-white-100 dark:font-sm">Il y a {timeSince(date, 2)} </p>
                    </div>

                </div>
                {icon && <Icon icon="bi bi-x" onClick={handleDelete} variant="secondary" size="sm" />}
            </div>
        </div>
    )
}
