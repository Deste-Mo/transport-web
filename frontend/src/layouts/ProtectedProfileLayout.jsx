import {Navigate, Outlet, useParams} from "react-router-dom";
import {useEffect, useLayoutEffect, useMemo, useState} from "react";
import {useAuth} from "../context/AuthProvider.jsx";
import {appVariants} from "../animations/variants.js";
import {motion} from "framer-motion";
import DefaultLoader from "../components/loader/DefaultLoader.jsx";
import useUserHook from "../hooks/useUserHook.js";

const ProtectedProfileLayout = () => {
    const {id: userIdParam} = useParams();
    const {token} = useAuth();
    const [authorized, setAuthorized] = useState(false);
    const [loadingValidation, setLoadingValidation] = useState(true);
    const {loading, error, user, fetchUser} = useUserHook();

    
    useEffect(() => {
        fetchUser(token);
    }, [])
    
    useEffect(() => {
        setLoadingValidation(true);
        if (!loading && user?.id && userIdParam) {
            setAuthorized(user.id === userIdParam);
            setLoadingValidation(false);
        }
    }, [loading, user, userIdParam]);

    if (loading || loadingValidation) {
        return <DefaultLoader/>;
    }

    if (error) {
        console.error("Failed to fetch user:", error);
        return
    }

    return (
        <motion.section
            className="protected-layout"
            variants={appVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {authorized ? <Outlet/> : <Navigate to={`/profile/${user.id}`}/>}
        </motion.section>
    );
}


export default ProtectedProfileLayout;