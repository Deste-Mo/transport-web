import {Navigate, Outlet, useParams} from "react-router-dom";
import Profile from "../pages/profile/Profile.jsx";
import {appVariants} from "../animations/variants.js";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";
import { useUser } from "../context/UserProvider.jsx";
import { useAuth } from "../context/AuthProvider.jsx";
import DefaultLoader from "../components/loader/DefaultLoader.jsx";

const ProfileLayout = () => {
    const [validProfile, setValidProfile] = useState(false);
    const [loading, setLoading] = useState(true);
    const {id} = useParams();
    const {getUserExists} = useUser();
    const checkProfile = () => {
        setLoading(true);
        // TODO : Check if the profile id is valid
        setValidProfile(getUserExists(id));
        setLoading(false);
    }
    const { getInformation, token } = useAuth();

    useEffect(() => {
        checkProfile();
        // getInformation(token, id);
    }, [])
    return (
        <motion.section
            className="flex items-start  w-full justify-between nav-page-container h-[86vh] relative"
            variants={appVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true}}
        >
            {
                loading ? <DefaultLoader/> // TODO : Loading animation component
                    :
                    validProfile ? (
                        <>
                            <div
                                className="w-full basis-[46%] overflow-x-hidden scrollbar-none rounded-xl max-md:hidden">
                                <Profile/>
                            </div>
                            <div
                                className="w-full overflow-x-hidden h-full basis-[50%] scrollbar-none  max-md:basis-full ">
                                <Outlet/>
                            </div>
                        </>
                    ) : (
                        <Navigate to={'/notFound'}/>
                    )

            }
        </motion.section>
    );
};

export default ProfileLayout;
