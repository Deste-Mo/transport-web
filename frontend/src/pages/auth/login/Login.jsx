import {
    Button,
    TextInput
} from "../../../styles/components";

import {Link, useNavigate} from "react-router-dom";
import {EMAIL_REGEX, PASSWORD_REGEX, SERVERLINK, TOAST_TYPE} from "../../../constants";
import {useState, useEffect} from "react";
import {useAuth} from "../../../context/AuthProvider.jsx";
import {useForm} from "../../../context/FormProvider.jsx";
import api from "../../../utils/api.js";
import {useAnimation} from "../../../context/AnimationProvider.jsx";

const Login = () => {
    const {setErrorData, errorData, login, inputs, setInputs} = useAuth();
    const {handleInputChange, handleError} = useForm();
    const [loading, setLoading] = useState(false);
    const {setMessagePopup} = useAnimation();

    const {email, password} = inputs;

    const handleLogin = async (e) => {
        setLoading(true);
        e.preventDefault();

        api.post("/api/auth/login", {email, password})
            .then(res => {
                const accessToken = res.data.accessToken;
                setMessagePopup("Utilisateur connecté", TOAST_TYPE.success);
                login(accessToken);
            })
            .catch(e => {
                setMessagePopup(e.response.data.error, TOAST_TYPE.error);
                console.log(`Erreur : ${e.response.data.error}`);
            })
        setLoading(false);
    };


    return (
        <section
            className="w-fullscreen bg-gray-80 auth-section space-y-[128px] absolute top-[128px] left-1/2 -translate-x-1/2 ">
            <div className="h1 text-subtitle-1 w-full text-center">
                Connecter vous dans votre compte
                <span className="text-primary-100"> Media Trans</span>
            </div>
            {/* Main Form */}
            <div className="flex flex-col items-center justify-center">
                <form
                    className="flex flex-col  items-start justify-center gap-[32px] w-fit p-6 border bg-white-100 border-black-0 rounded-xl"
                    onSubmit={handleLogin}
                >
                    <div className="flex flex-col items-center w-full justify-center gap-6">
                        <TextInput
                            title="Email"
                            type="text"
                            placeholder="Entrer votre email"
                            name="email"
                            id="email"
                            errorMsg="Email incorrecte"
                            pattern={EMAIL_REGEX}
                            value={inputs.email}
                            onError={handleError(setErrorData)}
                            onChange={(e) => handleInputChange(setInputs, e)}
                        />
                        <TextInput
                            title="Mot de passe"
                            type="password"
                            placeholder="Entrer votre mot de passe"
                            name="password"
                            pattern={PASSWORD_REGEX}
                            errorMsg="Entrer une mot de passe valide"
                            id="password"
                            onError={handleError(setErrorData)}
                            onChange={(e) => handleInputChange(setInputs, e)}
                            value={inputs.password}
                        />
                    </div>
                    <a href="\mdp" className="text-small-1 underline text-primary-100">
                        Mot de passe oublié
                    </a>
                    <Button loading={loading}  block>Se
                        connecter</Button>     
{/*                    <Button loading={loading} disabled={errorData.email || errorData.password} block>Se
                        connecter</Button>*/}
                    <p className="text-small-1 text-black-80">
                        Pas encore de compte ?{" "}
                        <Link to="/registerAccountType" className="text-primary-100 underline">
                            Créer un compte
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Login;
