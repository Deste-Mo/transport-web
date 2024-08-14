import { useNavigate } from "react-router-dom";
import Button from "../ui/Button";

const SavePublication = ({ icon = false, capacity, userId, title, depart, destination, scheduleddate, disable = false }) => {

    const navigate = useNavigate()

    // console.log(scheduleddate);

    return (
        <div className="flex flex-col gap-6 rounded-lg p-4 bg-white-100" >
            <div className="flex flex-col gap-4 p-1 bg-white-100">
                {icon ? null : <i className="bi bi-three-dots"></i>}
                <div className="flex items-center justify-between">
                    <span>{title}</span>
                    <span><i className="bi bi-box2"></i> { " " +capacity}</span>
                </div>
                <div className="flex items-center justify-between">
                    <div className="flex gap-1">
                        <i className="bi bi-map"></i>
                        <span>{depart + " à " +  destination}</span>
                    </div>
                    <span className="rounded-lg p-1 bg-primary-40">{new Date(scheduleddate).toLocaleDateString()}</span>
                </div>
                {disable ? null : <Button variant="secondary" block onClick={() => navigate("/profile/:id")}>Voir</Button>}
            </div>
        </div>
    )
}

export default SavePublication;