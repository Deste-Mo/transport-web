import {Navigate, Outlet, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAuth} from "../context/AuthProvider.jsx";
import {appVariants} from "../animations/variants.js";
import {motion} from "framer-motion";

const ProtectedProfileLayout = ( ) => {
    const {id} = useParams();
    const  [authorized, setAuthorized] = useState(false);
    const [loading ,setLoading] = useState(true);
    const {personalInformation} = useAuth();
    const user = personalInformation;
    
    
    const verifyId = () => {
        setLoading(true)
        setAuthorized(personalInformation.id === id);
        setLoading(false);
    }

    useEffect(() => {
        verifyId();
    }, []);
    
    return (
        <motion.section
            className=""
            variants={appVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true}}
        >
            {
                loading ? (
                    <p>Loading ...</p> // TODO : Loading component
                ) : (
                    authorized ? <Outlet/> : <Navigate to={"/forbidden"}/>
                )
            }
            </motion.section>
    )
}

export default ProtectedProfileLayout;