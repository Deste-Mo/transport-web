/** Importing all auth */

import { useEffect, useState } from "react";
import Login from "../pages/auth/login/Login";
import RegisterAccountType from "../pages/auth/register/RegisterAccountType";
import RegisterSecurity from "../pages/auth/register/RegisterSecurity";
import RegisterIdentification from "../pages/auth/register/RegisterIdentification";
import { Navigate, Outlet } from "react-router-dom";
import {useForm} from "../context/FormProvider.jsx";
import {useAuth} from "../context/AuthProvider.jsx";
import axios from "axios";
import {SERVERLINK} from "../constants/index.js";

export { Login, RegisterAccountType, RegisterSecurity, RegisterIdentification };

const AuthLayout = () => {
  const { token, loading } = useAuth();
  
  return !loading ? (token !== null ? <Navigate to="/" /> : <Outlet/>) : <p className="text-black-100">Loading ...</p>
};

export default AuthLayout;

