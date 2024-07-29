import {useState} from "react"
import {useNavigate} from "react-router-dom";
import {Icon} from "../../styles/components.js";

export function Notification({propos, time, icon = false, viewed = false}) {
    const navigate = useNavigate()

    const handleClick = () => {
        navigate("/notification/:id");
        setVues(true);
        console.log("vues")
    }
    return (
        <div onClick={handleClick}
             className={`flex flex-col gap-6 rounded-xl p-4  group transition-color duration-300  border  ${viewed ? "bg-white-100 border-black-0" : "bg-primary-40 border-primary-40"}`}>
            <div className="flex items-center justify-between w-full">
                <div className="flex items-start gap-2 flex-col">
                    <p className="text-base text-black-100 group-hover:underline cursor-pointer">{propos}</p>
                    <div className="flex  gap-1  justify-start items-center">
                        <div className={`size-2 rounded-full ${viewed ? 'bg-black-60' : 'bg-primary-100'}`}></div>
                        <p className="text-small-1 text-black-60">Il y a {time} </p>
                    </div>

                </div>
                {icon && <Icon icon="bi bi-check" variant="secondary" size="sm" />}
            </div>
        </div>
    )
}
