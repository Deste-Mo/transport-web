import { createContext, useContext, useEffect, useState } from "react";

const UserPreferenceContext = createContext({});

const UserPreferenceProvider = ({children}) => {
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage?.getItem("darkMode")) || false);


    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
    }, [darkMode]); 

  return (<UserPreferenceContext.Provider value={{darkMode, setDarkMode}}>
  {children}
</UserPreferenceContext.Provider>)
}

export default UserPreferenceProvider


export const usePreference = () => {
    return useContext(UserPreferenceContext)
}