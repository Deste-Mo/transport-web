import {createContext, useContext} from "react";

const FriendContext = createContext({});

const FriendProvider = ({children}) => {
    
  return (
      <FriendContext.Provider value={{}}>
        {children}
      </FriendContext.Provider>
  )
} 

export default FriendProvider;

export const useFriend = ()=> useContext(FriendContext);