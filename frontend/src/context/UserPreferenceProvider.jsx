import { createContext, useContext, useEffect, useState } from "react";

const UserPreferenceContext = createContext({});

const UserPreferenceProvider = ({children}) => {
    const [darkMode, setDarkMode] = useState(JSON.parse(localStorage?.getItem("darkMode")) || false);


    useEffect(() => {
        localStorage.setItem('darkMode', darkMode);
        if (darkMode) {
            document.documentElement.classList.add("dark");
          } else {
            document.documentElement.classList.remove("dark");
          }
    }, [darkMode]); 

  return (<UserPreferenceContext.Provider value={{darkMode, setDarkMode}}>
  {children}
</UserPreferenceContext.Provider>)
}

export default UserPreferenceProvider


export const usePreference = () => {
    return useContext(UserPreferenceContext)
}