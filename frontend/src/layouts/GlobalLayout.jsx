import {Outlet} from "react-router-dom";
import {toastVariants} from "../animations/variants.js";
import {Toast} from "../styles/components.js";
import {TOAST_TYPE} from "../constants/index.js";
import {motion} from "framer-motion";
import {useAnimation} from "../context/AnimationProvider.jsx";

const GlobalLayout = () => {
    const {showMessagePopup, setShowMessagePopup, toast} = useAnimation();
    
    return (
        <section className="relative">
            <motion.div initial={false} animate={showMessagePopup ? "visible" : "hidden"} variants={toastVariants}
                        className="fixed right-10 top-[94px]  z-50">
                <Toast
                    onClick={() => setShowMessagePopup(false)} message={toast?.message}
                    error={toast?.type === TOAST_TYPE.error}
                />
            </motion.div>
            <Outlet/>
        </section>
    )
}

export default GlobalLayout;