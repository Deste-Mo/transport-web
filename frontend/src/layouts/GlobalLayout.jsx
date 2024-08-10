import {Outlet} from "react-router-dom";
import {confirmPopupVariants, toastVariants} from "../animations/variants.js";
import {Toast} from "../styles/components.js";
import {TOAST_TYPE} from "../constants/index.js";
import {motion} from "framer-motion";
import {useAnimation} from "../context/AnimationProvider.jsx";
import ConfirmPopup from "../components/ui/ConfirmPopup.jsx";
import {useApp} from "../context/AppPorvider.jsx";

const GlobalLayout = () => {
    const {showMessagePopup, setShowMessagePopup, toast, showConfirmPopup, setShowConfirmPopup} = useAnimation();
    const {confirmPopup, setConfirmPopup} = useApp();

    return (
        <section className="relative">
            <motion.div initial={false}  animate={showMessagePopup ? "visible" : "hidden"} variants={toastVariants}
                        className="fixed right-10 top-[94px]  z-50">
                <Toast
                    onClick={() => setShowMessagePopup(false)} message={toast?.message}
                    error={toast?.type === TOAST_TYPE.error}
                />
            </motion.div>
            <motion.div initial={false}
                animate={showConfirmPopup ? {visibility : "visible"} : {visibility : "hidden"}}
                className={`z-50 bg-black-60 w-full h-screen flex items-center justify-center fixed top-0 left-0`}
            >
                <motion.div  initial={false} variants={confirmPopupVariants}
                            animate={showConfirmPopup ? "visible" : "hidden"}>
                    <ConfirmPopup message={confirmPopup.message}
                                  onCancel={() => {
                                      setConfirmPopup(confirmPopup => ({...confirmPopup, confirmed: false}));
                                      setShowConfirmPopup(false);
                                  }}
                                  onConfirm={() => {
                                      setConfirmPopup(confirmPopup => ({...confirmPopup, confirmed: true}));
                                      setShowConfirmPopup(false);
                                  }}/>
                </motion.div>
            </motion.div>
            
            <Outlet/>
        </section>
    )
}

export default GlobalLayout;