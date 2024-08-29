import { useState } from "react";
import { useAnimation } from "../../../context/AnimationProvider";
import api from "../../../utils/api";
import { EMAIL_REGEX, EMAIL_REGEX_MESSAGE, TOAST_TYPE } from "../../../constants";
import { Button, TextInput } from "../../../styles/components";
import { Link, useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Ajout de l'état de chargement

    const { setMessagePopup } = useAnimation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Démarrer le chargement

        try {
            const res = await api.post("/api/auth/forgot-password", { email });
            setMessagePopup(res.data.message, TOAST_TYPE.success);
            navigate("/forgot-password/WaitLink");
        } catch (error) {
            setMessagePopup(error.response?.data?.error || 'Erreur inconnue', TOAST_TYPE.error);
            console.log(`Erreur : ${error.response?.data?.error || error.message}`);
        } finally {
            setIsLoading(false); // Arrêter le chargement
        }
    };

    return (
        <section className="w-full h-screen flex flex-col items-center justify-center space-y-[32px] px-4">
            <div className="text-subtitle-1 text-center text-black-100 dark:text-white-100">
                Réinitialiser votre
            <span className="text-primary-100"> Mot de passe</span>
        </div>

            <form
                className="flex flex-col items-center w-full max-w-md p-6 border bg-white-100 dark:bg-white-10 dark:border-none border-black-0 rounded-xl space-y-4"
                onSubmit={handleSubmit}
            >
                    <TextInput
                        title="Email"
                    type="email"
                        placeholder="Entrer votre email"
                        name="email"
                        id="email"
                        errorMsg={EMAIL_REGEX_MESSAGE}
                        pattern={EMAIL_REGEX}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                <Button block type="submit" disabled={isLoading}>
                    {isLoading ? 'Envoi en cours...' : 'Envoyer le lien de réinitialisation'}
                </Button>

                {isLoading && (
                    <div className="flex justify-center mt-4">
                        {/* Animation de chargement */}
                        <div className="w-8 h-8 border-4 border-t-4 border-primary-100 border-solid rounded-full animate-spin"></div>
                </div>
                )}

                <p className="text-small-1 text-black-80 dark:text-white-80">
                    Déjà membre ?{" "}
                    <Link to="/login" className="text-primary-100 underline">
                        Se connecter
                    </Link>
                </p>
            </form>
    </section>
    );
};

export default ForgotPassword;