import {useAuth} from "../context/AuthProvider.jsx";
import {Navigate, Outlet} from "react-router-dom";
import {Header} from "../components/pages/Header.jsx";
import {SERVERLINK} from "../constants/index.js";
import {motion} from "framer-motion";
import {appVariants} from "../animations/variants.js";
import { usePreference } from "../context/UserPreferenceProvider.jsx";

const AppLayout = () => {
    const {token, loading, personalInformation} = useAuth();
    const {darkMode} = usePreference();
    const user = personalInformation;
    
    
    return <div className={`bg-gray-100 dark:bg-black-100 overflow-hidden h-screen ${darkMode && 'dark'}`}>
        {
            loading ? <p className="text-black-100 text-title-3">Loading ...</p> : token ?
            <section className="relative">
                <Header profileImage={SERVERLINK + "/" + user.profile || "X.png"}/>
                <div className="mt-[7em]" >
                    <Outlet/>
                </div>
            </section> : <Navigate to="/login"/>
        }
    </div>
}


export default AppLayout;
