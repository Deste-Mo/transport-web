import {useAuth} from "../context/AuthProvider.jsx";
import {Navigate, Outlet} from "react-router-dom";
import {Header} from "../components/pages/Header.jsx";
import {SERVERLINK} from "../constants/index.js";
import {motion} from "framer-motion";
import {appVariants} from "../animations/variants.js";

const AppLayout = () => {
    const {token, loading, personalInformation} = useAuth();
    const user = personalInformation;
    
    
    return loading ? <p className="text-black-100 text-title-3">Loading ...</p> : token ?
        <section className="relative">
            <Header profileImage={SERVERLINK + "/" + user.profile || "X.png"}/>
            <div className="mt-[7em]" >
                <Outlet/>
            </div>
        </section> : <Navigate to="/login"/>;
}


export default AppLayout;