/** Importing all auth */

import { useEffect, useState } from "react";
import Login from "./login/Login";
import Register from "./register/Register";
import RegisterPass from "./register/RegisterPass";
import RegisterCli from "./register/camCli/RegisterCli";
import RegisterEntr from "./register/entreprise/RegisterEntr";

export { Login, Register, RegisterCli, RegisterEntr, RegisterPass };

const AuthLayout = () => {
  const [accountId, setAccountId] = useState(1);
  const [isAuth, setIsAuth] = useState(false);

  return !isAuth && accountId !== 0 ? <Outlet /> : <Navigate to="/login"  />;
};

export default AuthLayout;

import { Navigate, Outlet } from "react-router-dom";
