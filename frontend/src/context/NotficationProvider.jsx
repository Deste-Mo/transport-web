import {createContext, useContext, useState} from "react";
import {SERVERLINK} from "../constants/index.js";
import axios from "axios";
import {useAuth} from "./AuthProvider.jsx";

const NotificationContext = createContext({});

const NotificationProvider = ({children}) => {
    const {token} = useAuth();
    
    const [notifications, setNotifications] = useState([]);
    const [unreadNotificationsCount, setUnreadNotfificationsCount] = useState(0);
    
    const getNotifications = async () => {
        const response = await axios.get(`${SERVERLINK}/api/notifs/getnotifs`, {headers : {token}});
        setNotifications(response?.data?.notifications);
    }
    const getUnreadNotifications = async () => {
        const response = await axios.get(`${SERVERLINK}/api/notifs/unreadnotif`, {headers : {token}});
        setUnreadNotfificationsCount(response?.data?.notifRes?.count)
    }
    
  return (
      <NotificationContext.Provider value={{notifications, unreadNotificationsCount, getNotifications, getUnreadNotifications}}>
        {children}
      </NotificationContext.Provider>
  )
} 

export default NotificationProvider;

export const useNotification = ()=> useContext(NotificationContext);