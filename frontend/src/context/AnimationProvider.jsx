import { createContext, useContext, useState } from "react";
import { TOAST_TYPE } from "../constants/index.js";

const AnimationContext = createContext({});

const AnimationProvider = ({ children }) => {
  const [togglePopup, setTogglePopup] = useState(false);
  const [showMessagePopup, setShowMessagePopup] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(true);
  const [showBackIcon, setShowBackIcon] = useState(false);
  const [hideMobileNavigation, setHideMobileNavigation] = useState(false);

  const [toast, setToast] = useState({
    message: null,
    type: TOAST_TYPE.success,
  });

  const setMessagePopup = (message, type) => {
    setToast({
      message: message,
      type: type,
    });

    setShowMessagePopup(true);
    setTimeout(() => setShowMessagePopup(false), 2000);
  };

  return (
    <AnimationContext.Provider
      value={{
        togglePopup,
        hideMobileNavigation,
        setHideMobileNavigation,
        setTogglePopup,
        showMessagePopup,
        setShowMessagePopup,
        setMessagePopup,
        toast,
        setShowConfirmPopup,
        showConfirmPopup,
        showBackIcon,
        setShowBackIcon,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
};

export default AnimationProvider;

export const useAnimation = () => {
  return useContext(AnimationContext);
};
