import {createContext, useContext} from "react";

const ProfileContext = createContext({});

const ProfileProvider = ({children}) => {
  return (
      <ProfileContext.Provider value={{}}>
        {children}
      </ProfileContext.Provider>
  )
} 

export default ProfileProvider;

export const useProfile = ()=> useContext(ProfileContext);