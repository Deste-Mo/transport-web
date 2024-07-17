import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

export function SavePublication({ icon = false, name, price, lieu, remarque, etat, disable = false}){
    
    const navigate = useNavigate()

    return (
        <div className="flex flex-col gap-6 rounded-lg p-4 bg-white-100" >
            <div className="flex flex-col gap-4 p-1 bg-white-100">
                {icon? null :  <i className="bi bi-three-dots"></i>}
                <div className="flex items-center justify-between">
                    <span>{name}</span>
                    <span><strong>{price}</strong></span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                        <i className="bi bi-map"></i>
                        <span>{lieu}</span>
                    </div>
                    <div className="flex gap-1">
                        <i className="bi bi-box2"></i>
                        <span>{remarque}</span>
                    </div>
                    <span className="rounded-lg p-1 bg-primary-40">{etat}</span>
                </div>
                {disable? null : <Button variant="secondary" block onClick={() => navigate("/profile/:id")}>Voir</Button>}
            </div>
        </div>
    )
}
