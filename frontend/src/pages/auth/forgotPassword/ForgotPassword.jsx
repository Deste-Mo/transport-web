import { useState } from "react";
import { useAnimation } from "../../../context/AnimationProvider";
import api from "../../../utils/api";
import { EMAIL_REGEX, TOAST_TYPE } from "../../../constants";
import { Button, TextInput } from "../../../styles/components";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');

    const {setMessagePopup} = useAnimation();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Mon email : " + email);
        api.post("/api/auth/forgot-password", {email})
            .then(res => {
                setMessagePopup(res.data.message, TOAST_TYPE.success);
                navigate("/forgot-password/WaitLink")
            })
            .catch(e => {
                setMessagePopup(e.response.data.error, TOAST_TYPE.error);
                console.log(`Erreur : ${e.response.data.error}`);
            })
    };

    return (
        <section
        className="w-fullscreen  auth-section space-y-[128px] absolute top-[128px] left-1/2 -translate-x-1/2 ">
        <div className="h1 text-subtitle-1 w-full text-center text-black-100 dark:text-white-100">
            Reinitialiser votre
            <span className="text-primary-100"> Mot de passe</span>
        </div>
        {/* Main Form */}
        <div className="flex flex-col items-center justify-center">
            <form
                className="flex flex-col  items-start justify-center gap-[32px] w-fit p-6 border bg-white-100 dark:bg-white-10 dark:border-none border-black-0 rounded-xl"
                onSubmit={handleSubmit}
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
                        value={email}
                        // onError={handleError(setErrorData)}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <Button block> Envoyer le lien de reinitialisation</Button>     

                <p className="text-small-1 text-black-80 dark:text-white-80">
                    Deja membre ?{" "}
                    <Link to="/login" className="text-primary-100 underline">
                        se connecter
                    </Link>
                </p>
            </form>
        </div>
    </section>
    );
}

export default ForgotPassword;