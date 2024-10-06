import {Navigate, Outlet, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useAuth} from "../context/AuthProvider.jsx";
import {appVariants} from "../animations/variants.js";
import {motion} from "framer-motion";

const ProtectedProfileLayout = ( ) => {
    const {id} = useParams();
    const  [authorized, setAuthorized] = useState(false);
    const [loading ,setLoading] = useState(true);
    const {personalInformation, getInformation, token} = useAuth();

    const [user, setUser] = useState(personalInformation);

    useEffect(() => {
        console.log(user.id === id, "user: " + user.id, "id: " + id)
        verifyId();
    }, [user])

    useEffect(() => {
        setUser(personalInformation);
    }, [personalInformation])

    useEffect(() => {
        getInformation();
    }, [])
    
    const verifyId = () => {
        setLoading(true)
        setAuthorized( user.id === id);
        setLoading(false);
    }
    
    
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