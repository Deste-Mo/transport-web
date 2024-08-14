import {useParams} from "react-router-dom";
import {useAuth} from "../../context/AuthProvider";
import NewOffer from "../offer/NewOffer";
import {useEffect} from "react";
import Offers from "../Offers";
import Profile from "./Profile.jsx";

const ProfileDetails = () => {
    const {personalInformation} = useAuth();
    const currentUser = personalInformation;
    const {id} = useParams();
    
    return (
        <section className="w-full">
            <div className="md:hidden">
                <Profile/>
            </div>
            <div className="max-md:hidden">
                {currentUser.id === id ? <NewOffer/> : <Offers/>}
            </div>
        </section>
    );
};

export default ProfileDetails;
