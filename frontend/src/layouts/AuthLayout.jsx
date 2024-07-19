/** Importing all auth */

import { useEffect, useState } from "react";
import Login from "../pages/auth/login/Login";
import RegisterAccountType from "../pages/auth/register/RegisterAccountType";
import RegisterSecurity from "../pages/auth/register/RegisterSecurity";
import RegisterIdentification from "../pages/auth/register/RegisterIdentification";
import { Navigate, Outlet } from "react-router-dom";
import {useForm} from "../context/FormProvider.jsx";

export { Login, RegisterAccountType, RegisterSecurity, RegisterIdentification };

const AuthLayout = () => {
  const {isAuth} = useForm();

  return isAuth ? <Navigate to="/login"  /> : <Outlet/> ;
};

export default AuthLayout;

