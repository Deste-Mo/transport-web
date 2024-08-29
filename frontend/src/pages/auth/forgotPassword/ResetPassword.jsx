import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { PASSWORD_REGEX, TOAST_TYPE } from "../../../constants";
import api from "../../../utils/api";
import { Button, TextInput } from "../../../styles/components";
import { useAnimation } from "../../../context/AnimationProvider";


const ResetPassword = () => {
    const [password, setPassword] = useState('');

    const [confirmPassword, setConfirmPassword] = useState('');

    const { token } = useParams();
    const { setMessagePopup } = useAnimation();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessagePopup("Les mots de passe ne correspondent pas", TOAST_TYPE.error);
            return;
        }

        try {
            const res = await api.post("/api/auth/reset-password", { token, password });
            setMessagePopup(res.data.message, TOAST_TYPE.success);
            navigate("/login");
        } catch (error) {
            setMessagePopup(error.response?.data?.error || "Erreur inconnue", TOAST_TYPE.error);
            console.log(`Erreur : ${error.response?.data?.error || error.message}`);
        }
    };

    return (
        <section className="flex flex-col items-center justify-center w-full h-screen bg-gray-80 space-y-[32px] px-4">
            <div className="text-center text-subtitle-1 text-black-100 dark:text-white-100">
                Réinitialiser votre <span className="text-primary-100">mot de passe</span>
            </div>

            <form
                className="flex flex-col items-center w-full max-w-md p-6 border bg-white-100 dark:bg-white-10 dark:border-none border-black-0 rounded-xl space-y-6"
                onSubmit={handleSubmit}
            >
                    <h3 className="text-subtitle-3 text-black-100 dark:text-white-100">Sécurité</h3>
                <div className="flex flex-col w-full gap-6">
                        <TextInput
                            name="password"
                            title="Mot de passe"
                            type="password"
                            placeholder="Entrer votre mot de passe"
                            errorMsg="Mot de passe incorrect"
                            pattern={PASSWORD_REGEX}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <TextInput
                            name="confirmPassword"
                            title="Confirmer"
                            type="password"
                            isValid={confirmPassword === password}
                            placeholder="Confirmer votre mot de passe"
                        errorMsg="Le mot de passe ne correspond pas"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                        />
                    </div>
                <Button block type="submit">
                    Terminer
                </Button>
            </form>
        </section>
    );
};

export default ResetPassword;