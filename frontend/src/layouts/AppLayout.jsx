import {useAuth} from "../context/AuthProvider.jsx";
import {Navigate, Outlet} from "react-router-dom";
import {useEffect} from "react";

const AppLayout = () => {
  const {isAuth, checkUserConnected} = useAuth();
  
  useEffect(() => {
    console.log("checkUserConnected AppLayout")
    checkUserConnected();
    console.log("isAuth : " + isAuth)
  }, []);
  
  return isAuth ? <Outlet/> : <Navigate to="/login" />
}

export default AppLayout;