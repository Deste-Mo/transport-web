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

    const {setMessagePopup} = useAnimation();

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        api.post("/api/auth/reset-password", { token, password })
        .then(res => {
            setMessagePopup(res.data.message, TOAST_TYPE.success);
            navigate("/login");
        })
        .catch(e => {
            setMessagePopup(e.response.data.error, TOAST_TYPE.error);
        })
    };

    return (
        <>
                <section
            className="absolute left-1/2 -translate-x-1/2 w-fullscreen bg-gray-80 auth-section space-y-[128px] top-[128px]">
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-full text-center h1 text-subtitle-1 text-black-100 dark:text-white-100">
                    Reinitialiser votre <span className="text-primary-100">mot de passe</span>
                </div>
            </div>
            <form
                className="flex w-fit flex-col items-start justify-center rounded-xl border p-4 border-black-0 bg-white-100 dark:text-white-100 gap-[32px]"
                onSubmit={handleSubmit}
            >
                <div className="flex w-full flex-col items-start justify-center gap-6">
                    <h3 className="text-subtitle-3 text-black-100 dark:text-white-100">Sécurité</h3>
                    <div className="flex flex-col items-start justify-center gap-6">
                        <TextInput
                            name="password"
                            title="Mot de passe"
                            type="password"
                            placeholder="Entrer votre mot de passe"
                            errorMsg="Mot de passe incorrect"
                            pattern={PASSWORD_REGEX}
                            // onError={handleError(setErrorData)}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <TextInput
                            name="confirmPassword"
                            title="Confirmer"
                            type="password"
                            isValid={confirmPassword === password}
                            placeholder="Confirmer votre mot de passe"
                            errorMsg={"Le mot de passe ne correspond pas"}
                            // onError={handleError(setErrorData)}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirmPassword}
                        />
                    </div>
                </div>
                <Button  block>
                    Terminer
                </Button>
            </form>
        </section>
        </>
    );
}

export default ResetPassword;