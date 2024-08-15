import {Button, Icon, TextInput} from "../../../styles/components";
import {REGISRATION_STEPS, SERVERLINK, ACCOUNT_TYPES, PASSWORD_REGEX, PASSWORD_REGEX_MESSAGE} from "../../../constants";
import {useAuth} from "../../../context/AuthProvider";
import {useForm} from "../../../context/FormProvider";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

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

    const {handleInputChange, handleError} = useForm();
    const [fieldError, setFieldError] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

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
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!data.error) {
                alert("Inscription réussie !");
                login(data.token);
                return;
            }
            console.log(data.error);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (registrationStep !== REGISRATION_STEPS.security) navigate(-1);
    }, []);

    useEffect(() => {
        // Check if all of the current fielfs are valid
        const {password, confirmPassword} = errorData;
        setFieldError(password || confirmPassword);
    }, [inputs, errorData]);

    return (
        <section
            className="absolute left-1/2 -translate-x-1/2 w-fullscreen bg-gray-80 auth-section space-y-[128px] top-[128px]">
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="flex w-full items-center justify-center">
                    <Icon
                        icon="bi bi-arrow-left"
                        onClick={() => {
                            navigate(-1);
                            setRegistrationStep(REGISRATION_STEPS.identification);
                        }}
                    />
                </div>
                <div className="w-full text-center h1 text-subtitle-1 text-black-100 dark:text-white-100">
                    Créer un <span className="text-primary-100">mot de passe</span>
                </div>
            </div>
            <form
                className="flex w-fit flex-col items-start justify-center rounded-xl border p-6 border-black-0 bg-white-100 dark:border-none dark:bg-white-10 gap-[32px]"
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
                            errorMsg={PASSWORD_REGEX_MESSAGE}
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
                            errorMsg={"Le mot de passe ne correspond pas"}
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
