/** Importing all auth */

import Login from "../pages/auth/login/Login";
import RegisterAccountType from "../pages/auth/register/RegisterAccountType";
import RegisterSecurity from "../pages/auth/register/RegisterSecurity";
import RegisterIdentification from "../pages/auth/register/RegisterIdentification";
import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from "../context/AuthProvider.jsx";

import DefaultLoader from "../components/loader/DefaultLoader.jsx";

export { Login, RegisterAccountType, RegisterSecurity, RegisterIdentification };

const AuthLayout = () => {
  const { token, loading } = useAuth();
  
  return !loading ? (token !== null ? <Navigate to="/" /> : <Outlet/>) : <DefaultLoader/>
};

export default AuthLayout;

