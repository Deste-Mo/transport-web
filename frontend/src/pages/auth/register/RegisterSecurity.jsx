import { Button, Icon, TextInput } from "../../../styles/components";
import { REGISRATION_STEPS, SERVERLINK, ACCOUNT_TYPES, PASSWORD_REGEX } from "../../../constants";
import { useAuth } from "../../../context/AuthProvider";
import { useForm } from "../../../context/FormProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterSecurity = () => {
    const {
        inputs,
        setInputs,
        setErrorData,
        errorData,
        registrationStep,
        setRegistrationStep,
        login
    } = useAuth();

    // console.log(inputs);

    const { handleInputChange, handleError } = useForm();
    const [fieldError, setFieldError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        console.log(inputs);

        const {
            firstname,
            lastname,
            userCin,
            companyNumber,
            phone,
            adress,
            email,
            bio,
            profileImage,
            accountId,
            password,
            confirmPassword,
        } = inputs;


        try {
            const body = {
                firstname,
                lastname,
                usercin: userCin,
                companynumber: companyNumber,
                phone,
                adress,
                email,
                bio,
                profileimage: profileImage,
                accountid: accountId === ACCOUNT_TYPES.camion ? 2 : accountId === ACCOUNT_TYPES.society ? 1 : 3,
                password,
                confirmPassword,
            };

            const response = await fetch(SERVERLINK + "/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });

            const parseRes = await response.json();

            if (!parseRes.error) {
                alert("Inscription réussie !");
                sessionStorage.setItem("refToken", parseRes.refToken);
                login(parseRes);
                return;
            }
            console.log(parseRes.error);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (registrationStep !== REGISRATION_STEPS.security) navigate(-1);
    }, []);

    useEffect(() => {
        // Check if all of the current fielfs are valid
        const { password, confirmPassword } = errorData;
        setFieldError(password || confirmPassword);
    }, [inputs, errorData]);

    return (
        <section
            className="w-fullscreen bg-gray-80 auth-section space-y-[128px] absolute top-[128px] left-1/2 -translate-x-1/2">
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-full flex items-center justify-center">
                    <Icon
                        icon="bi bi-arrow-left"
                        onClick={() => {
                            navigate(-1);
                            setRegistrationStep(REGISRATION_STEPS.identification);
                        }}
                    />
                </div>
                <div className="h1 text-subtitle-1 w-full text-center">
                    Créer un <span className="text-primary-100">mot de passe</span>
                </div>
            </div>
            <form
                className="flex flex-col  border border-black-20 bg-white-100 items-start justify-center gap-[32px] w-fit p-4 rounded-xl"
                onSubmit={handleSubmit}
            >
                <div className="flex flex-col items-start w-full justify-center gap-6">
                    <h3 className="text-subtitle-3 text-black-100">Sécurité</h3>
                    <div className="flex flex-col items-start justify-center gap-6">
                        <TextInput
                            name="password"
                            title="Mot de passe"
                            type="password"
                            placeholder="Entrer votre mot de passe"
                            errorMsg="Mot de passe incorrect"
                            pattern={PASSWORD_REGEX}
                            onError={handleError(setErrorData)}
                            onChange={(e) => handleInputChange(setInputs, e)}
                            value={inputs.password}
                        />
                        <TextInput
                            name="confirmPassword"
                            title="Confirmer"
                            type="password"
                            isValid={inputs.confirmPassword === inputs.password}
                            placeholder="Confirmer votre mot de passe"
                            onError={handleError(setErrorData)}
                            onChange={(e) => handleInputChange(setInputs, e)}
                            value={inputs.confirmPassword}
                        />
                    </div>
                </div>
                <Button disabled={fieldError} block>
                    Terminer
                </Button>
            </form>
        </section>
    );
};

export default RegisterSecurity;
