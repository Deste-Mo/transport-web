import {
Button,
TextInput
} from "../../../styles/components";

import {Link, useNavigate} from "react-router-dom";
import { SERVERLINK } from "../../../constants";
import { useState } from "react";
import {useAuth} from "../../../context/AuthProvider.jsx";

const Login = () => {
  const {setAuth, getInformation} = useAuth();
  const navigate = useNavigate();
  
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");

  const { email, password } = inputs;

  const inputsOnChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    const body = { email, password };
    const response = await fetch(SERVERLINK + "/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const parseRs = await response.json();

    if (!parseRs.error) {
      localStorage.setItem("token", parseRs.token);
      setAuth(true);
      getInformation();
      navigate("/");
    }
    setError(parseRs.error);
    console.log(parseRs);
  };

  return (
    <section className="w-fullscreen relative">
      <div className="flex mt-5 ml-3 relative">
        <span className="w-[5px] h-[100px] bg-maintr-100 mr-2"></span>
        <div>
          <p className="text-subtitle-2 boxShadow text-black-100">
            Connectez-vous pour commencer a utiliser
          </p>
          <br />
          <p className="text-subtitle-1 text-primary-100">
            Media <span className="text-maintr-100">Trans</span>
          </p>
        </div>
      </div>
      
      {/* Main Form */}
      <div className="flex flex-col items-center justify-center">
        <form
          className="flex flex-col  items-start justify-center gap-[32px] w-fit p-4 border border-black-20 rounded-xl"
          onSubmit={handleLogin}
        >
          <div className="flex flex-col items-center w-full justify-center gap-6">
            <TextInput
              title="Email"
              type="text"
              placeholder="Entrer votre email"
              name="email"
              id="email"
              onChange={(e) => inputsOnChange(e)}
            />
            <TextInput
              title="Mot de passe"
              type="password"
              placeholder="Entrer votre mot de passe"
              name="password"
              id="password"
              onChange={(e) => inputsOnChange(e)}
            />
          </div>
          <a href="\mdp" className="text-small-1 underline text-primary-100">
            Mot de passe oublié
          </a>
          <Button block >Se connecter</Button>
        </form>
      </div>

      {/*  */}
      <div className="flex flex-col gap-10 rounded-xl border border-black-20 p-4 w-fit absolute top-[512px] right-[512px]">
        <p className="text-lead text-center text-black-80 font-thin">
          Vous n'avez pas encore de compte?
        </p>
        <Link to="/register">
          <Button variant="secondary" block>Créer un compte</Button>
        </Link>
      </div>
    </section>
  );
};

export default Login;
