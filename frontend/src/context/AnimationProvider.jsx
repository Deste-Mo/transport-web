import {createContext, useContext, useState} from "react";
import {TOAST_TYPE} from "../constants/index.js";

const AnimationContext = createContext({});

const AnimationProvider = ({children}) => {

    const [togglePopup, setTogglePopup] = useState(false);
    const [showMessagePopup, setShowMessagePopup] = useState(false);
    const [showConfirmPopup, setShowConfirmPopup] = useState(false);
    
    const [toast, setToast] = useState({
        message : null,
        type : TOAST_TYPE.success
    });


    const setMessagePopup =  (message, type) => {
        setToast({
            message:  message,
            type : type
        })
        
        setShowMessagePopup(true);
        setTimeout(() => setShowMessagePopup(false), 2000);
    }
    

    return ( 
    <AnimationContext.Provider value={{
        togglePopup,
        setTogglePopup,
        showMessagePopup,
        setShowMessagePopup,
        setMessagePopup,
        toast,
        setShowConfirmPopup,
        showConfirmPopup,
    }}>
        {children}
    </AnimationContext.Provider>
    )
}

export default AnimationProvider;

export const useAnimation = () => {
    return useContext(AnimationContext)
}

