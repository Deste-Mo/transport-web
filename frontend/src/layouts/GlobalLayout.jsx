import {Outlet} from "react-router-dom";
import {confirmPopupVariants, toastVariants} from "../animations/variants.js";
import {Toast} from "../styles/components.js";
import {TOAST_TYPE} from "../constants/index.js";
import {motion} from "framer-motion";
import {useAnimation} from "../context/AnimationProvider.jsx";
import ConfirmPopup from "../components/ui/ConfirmPopup.jsx";
import {useApp} from "../context/AppProvider.jsx";

const GlobalLayout = () => {
    const {showMessagePopup, setShowMessagePopup, toast, showConfirmPopup } = useAnimation();
    const {confirmPopup} = useApp();

    return (
        <section className="relative w-ful ">

            <motion.div
                initial={"hidden"}
                exit={{opacity: 0, scale: 0}}
                animate={showMessagePopup ? "visible" : "hidden"}
                variants={toastVariants}
                style={{
                    translateX: "-50%", // Replace Tailwind's `-translate-x-1/2`
                    left: "50%"         // Keep horizontal centering
                }}
                className="fixed top-10">

                <Toast
                    onClick={() => setShowMessagePopup(false)} message={toast?.message}
                    error={toast?.type === TOAST_TYPE.error}
                />
            </motion.div>
            <motion.div initial={false}
                        animate={ confirmPopup.visible ? {visibility: "visible"} : {visibility: "hidden"}}
                        className={`z-50 bg-black-60 w-full h-screen flex items-center justify-center fixed top-0 left-0`}
            >
                <motion.div initial={"hidden"} variants={confirmPopupVariants}
                            animate={confirmPopup.visible ? "visible" : "hidden"}
                >
                    <ConfirmPopup message={confirmPopup.message}
                                  onCancel={
                                      confirmPopup.onCancel
                                  }
                                  onConfirm={
                                      confirmPopup.onConfirm
                                  }/>
                </motion.div>
            </motion.div>

            <Outlet/>
        </section>
    )
}

export default GlobalLayout;