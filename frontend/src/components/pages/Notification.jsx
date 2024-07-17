import { useState } from "react"
import { useNavigate } from "react-router-dom";

export function Notification({ propos, heures, icon = false, vue = false}){
    const [vues, setVues] = useState(false);

    const navigate = useNavigate()

    const onClick = () => { navigate("/notification/:id"); setVues(true); console.log("vues") }
    return (
        <div onClick={onClick} className={(vue || vues)? "flex flex-col gap-6 rounded-lg p-4 bg-white-100 cursor-pointer hover:shadow-lg hover:scale-105 hover:transition-all" : "flex flex-col gap-6 rounded-lg p-4 bg-primary-40 cursor-pointer hover:shadow-lg hover:scale-105 hover:transition-all"}>
            <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                    <div className="flex flex-col">
                        <span>{propos}</span>
                        <div>
                            {(vue || vues) ? <span className="flex items-center gap-1"><span className="w-3 h-3 bg-black-60 rounded-full"></span>{"Il y a " + heures}</span> : <span className="flex items-center gap-1"><span className="w-3 h-3 bg-primary-100 rounded-full"></span>{"Il y a " + heures}</span>}
                        </div>
                    </div>
                </div>
                {icon?  <i className="bi bi-x text-icon"></i> : null}
            </div>
        </div>
    )
}
