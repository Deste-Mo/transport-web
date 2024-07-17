import {Route, Routes} from "react-router-dom";
import Profile from "./Profile.jsx";
import ProfilePresentation from "./ProfilPresentation.jsx";
import ProfileEdit from "./ProfileEdit.jsx";

const Profiles = () => {
    return (
        <>
            <Route path="profile/" element={<Profile/>}/>
            <Route path="profile/presentation" element={<ProfilePresentation/>}/>
            <Route path="profile/edit/:id" element={<ProfileEdit/>}/>
        </>
    )
}

export default Profiles;