import {Outlet} from "react-router-dom";
import {confirmPopupVariants, toastVariants} from "../animations/variants.js";
import {Toast} from "../styles/components.js";
import {TOAST_TYPE} from "../constants/index.js";
import {motion} from "framer-motion";
import {useAnimation} from "../context/AnimationProvider.jsx";
import ConfirmPopup from "../components/ui/ConfirmPopup.jsx";
import {useApp} from "../context/AppProvider.jsx";

const GlobalLayout = () => {
    const {showMessagePopup, setShowMessagePopup, toast, showConfirmPopup, setShowConfirmPopup} = useAnimation();
    const {confirmPopup, setConfirmPopup} = useApp();

    return (
        <section >
            <motion.div
                initial = {"hidden"}
                exit={{opacity: 0, scale: 0}}
                animate={showMessagePopup ? "visible" : "hidden"} variants={toastVariants}
                className="fixed left-[50%] -translate-x-1/2 top-10  z-50 max-md:w-[95%]"
                >
                <Toast
                    onClick={() => setShowMessagePopup(false)} message={toast?.message}
                    error={toast?.type === TOAST_TYPE.error}
                    className={"w-full"}
                />
            </motion.div>
            <motion.div initial={false}
                        animate={showConfirmPopup ? {visibility: "visible"} : {visibility: "hidden"}}
                        className={`z-50 bg-black-60 w-full h-screen flex items-center justify-center fixed top-0 left-0`}
            >
                <motion.div initial={false} variants={confirmPopupVariants}
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