import {Route, Routes} from "react-router-dom";
import Profile from "./Profile.jsx";
import ProfilePresentation from "./ProfilPresentation.jsx";
import ProfileEdit from "./ProfileEdit.jsx";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider.jsx";

const Profiles = () => {

    const { personalInformation, getInformation, token } = useAuth();
    
    useEffect(() => {
        getInformation(token);
    }, []);

    return (
        <>
            <Route path="profile/" element={<Profile/>}/>
            <Route path="profile/presentation" element={<ProfilePresentation/>}/>
            <Route path="profile/edit/:id" element={<ProfileEdit/>}/>
        </>
    )
}
export default Profiles;