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
    <section className="w-fullscreen bg-gray-80 auth-section space-y-[128px] absolute top-[128px] left-1/2 -translate-x-1/2 ">
      <div className="h1 text-subtitle-1 w-full text-center">
        Connecter vous dans votre compte
        <span className="text-primary-100"> Media Trans</span>
      </div>
      {/* Main Form */}
      <div className="flex flex-col items-center justify-center">
        <form
          className="flex flex-col  items-start justify-center gap-[32px] w-fit p-6 border border-black-20 rounded-xl"
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
          <Button block>Se connecter</Button>
          <p className="text-small-1 text-black-80">
            Pas encore de compte ?{" "}
            <Link to="/register" className="text-primary-100 underline">
              Créer un compte
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
