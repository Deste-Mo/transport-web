import {createContext, useContext} from "react";

const NotificationContext = createContext({});

const NotificationProvider = ({children}) => {
  return (
      <NotificationContext.Provider value={{}}>
        {children}
      </NotificationContext.Provider>
  )
} 

export default NotificationProvider;

export const useNotification = ()=> useContext(NotificationContext);