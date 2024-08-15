import {
    Button,
    TextInput
} from "../../../styles/components";

import {Link} from "react-router-dom";
import {EMAIL_REGEX, EMAIL_REGEX_MESSAGE, PASSWORD_REGEX, PASSWORD_REGEX_MESSAGE, TOAST_TYPE} from "../../../constants";
import {useState} from "react";
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
            }).finally(() => {
                setTimeout(() => setLoading(false), 200)
        })
    };


    return (
        <section
            className="w-full  auth-section space-y-[128px] absolute top-[128px] left-1/2 -translate-x-1/2 max-md:space-y-10">
            <div className="h1 text-subtitle-1 w-full text-center text-black-100 dark:text-white-100 max-md:text-subtitle-2">
                Connecter vous dans votre compte
                <span className="text-primary-100"> Media Trans</span>
            </div>
            {/* Main Form */}
            <div className="flex flex-col items-center justify-center w-full">
                <form
                    className="auth-form"
                    onSubmit={handleLogin}
                >
                    <div className="flex flex-col items-center w-full justify-center gap-6">
                        <TextInput
                            title="Email"
                            type="text"
                            placeholder="Entrer votre email"
                            name="email"
                            id="email"
                            errorMsg={EMAIL_REGEX_MESSAGE}
                            block
                            value={inputs.email}
                            onError={handleError(setErrorData)}
                            onChange={(e) => handleInputChange(setInputs, e)}
                        />
                        <TextInput
                            title="Mot de passe"
                            type="password"
                            placeholder="Entrer votre mot de passe"
                            name="password"
                            block
                            errorMsg={PASSWORD_REGEX_MESSAGE}
                            id="password"
                            onError={handleError(setErrorData)}
                            onChange={(e) => handleInputChange(setInputs, e)}
                            value={inputs.password}
                        />
                    </div>
                    <Link to="/forgot-password" className="text-small-1 underline text-primary-100">
                        Mot de passe oublié
                    </Link>
                    <Button loading={loading}  block>Se connecter</Button>
                    <p className="text-small-1 text-black-80 dark:text-white-80">
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
