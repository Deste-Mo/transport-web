



const AuthLayout = () => {
  return <div></div>;
};

export default AuthLayout;


/** Importing all auth */

import Login from "./login/Login";
import Register from "./register/Register";
import RegisterPass from "./register/RegisterPass";
import RegisterCli from "./register/camCli/RegisterCli";
import RegisterEntr from "./register/entreprise/RegisterEntr";

export {
    Login,
    Register,
    RegisterCli,
    RegisterEntr,
    RegisterPass,
};