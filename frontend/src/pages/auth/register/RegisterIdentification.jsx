import {useNavigate} from "react-router-dom";
import {Button, Icon, TextArea, TextInput} from "../../../styles/components";
import {useAuth} from "../../../context/AuthProvider";
import {useForm} from "../../../context/FormProvider";
import {useEffect, useState} from "react";
import {
    ACCOUNT_TYPES,
    CIN_REGEX, CIN_REGEX_MESSAGE,
    EMAIL_REGEX, EMAIL_REGEX_MESSAGE, LAST_NAME_REGEX, LAST_NAME_REGEX_MESSAGE,
    NAME_REGEX, NAME_REGEX_MESSAGE,
    NIF_STAT_REGEX, NIF_STAT_REGEX_MESSAGE,
    PHONE_REGEX, PHONE_REGEX_MESSAGE,
    REGISRATION_STEPS
} from "../../../constants";
import {appVariants} from "../../../animations/variants.js";
import {motion} from "framer-motion";

const RegisterIdentification = () => {
    const {
        inputs,
        setInputs,
        setErrorData,
        errorData,
        registerMode,
        registrationStep,
        setRegistrationStep,
    } = useAuth();
    const {handleInputChange, handleError} = useForm();
    const [fieldError, setFieldError] = useState(false);
    const isAccountTypeForCompany =
        registerMode.toLowerCase() === ACCOUNT_TYPES.society.toLowerCase();

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (fieldError) return console.log("Error : Verify your fields");

        setRegistrationStep(REGISRATION_STEPS.security);
        navigate("/registerSecurity");
    };

    useEffect(() => {
        if (registrationStep !== REGISRATION_STEPS.identification) navigate(-1);
    }, []);

    useEffect(() => {
        // Check if all of the current fielfs are valid
        const {
            firstname,
            userCin,
            lastname,
            companyNumber,
            email,
            phone,
            adress,
            bio,
        } = errorData;

        if (isAccountTypeForCompany) {
            setFieldError(
                firstname || companyNumber || email || phone || adress
            );
        } else {
            setFieldError(
                firstname || userCin || email || phone || adress || lastname
            );
        }
    }, [inputs, errorData]);

    return (
        <motion.section
            variants={appVariants}
            className="auth-section top-[64px]"
        >
            <div className="flex flex-col items-start justify-center gap-4">
                <div className="flex w-full items-center justify-center">
                    <Icon
                        icon="bi bi-arrow-left"
                        onClick={() => {
                            setRegistrationStep(REGISRATION_STEPS.accoutType);
                            navigate(-1);
                        }}
                    />
                </div>
                <div className="w-full text-center h1 text-subtitle-1 text-black-100 dark:text-white-100">
                    Entrez vos <span className="text-primary-100">identifications</span>
                </div>
            </div>
            <form
                className="auth-form w-[70%] mx-auto max-[940px]:w-full "
                onSubmit={handleSubmit}
            >
                <h3 className="text-subtitle-3 text-black-100 dark:text-white-100 max-md:text-center max-md:w-full">Identification</h3>
                <div
                    className="flex flex-row items-start justify-between gap-10 max-md:flex-col max-md:items-center  w-full">
                    <div className="flex flex-col items-center justify-center gap-10 w-full">
                        <div className="w-full space-y-6">{isAccountTypeForCompany ? (
                            <TextInput
                                name="companyNumber"
                                title="Numéro de l'entreprise"
                                placeholder=""
                                onError={handleError(setErrorData)}
                                onChange={(e) => handleInputChange(setInputs, e)}
                                value={inputs.companyNumber}
                                errorMsg={NIF_STAT_REGEX_MESSAGE}
                                pattern={NIF_STAT_REGEX}
                                block
                            />
                        ) : (
                            <TextInput
                                name="userCin"
                                title="CIN"
                                placeholder="Entrer votre CIN"
                                errorMsg={CIN_REGEX_MESSAGE}
                                pattern={CIN_REGEX}
                                onError={handleError(setErrorData)}
                                onChange={(e) => handleInputChange(setInputs, e)}
                                value={inputs.userCin}
                                block
                            />
                        )}</div>

                        <div className="w-full space-y-6"><TextInput
                            name="firstname"
                            title="Nom"
                            placeholder={
                                isAccountTypeForCompany
                                    ? "Entrer le nom de l'entreprise"
                                    : "Entrer votre nom"
                            }
                            errorMsg={NAME_REGEX_MESSAGE}
                            onError={handleError(setErrorData)}
                            onChange={(e) => handleInputChange(setInputs, e)}
                            value={inputs.firstname}
                            pattern={NAME_REGEX}
                            block
                        />
                            {!isAccountTypeForCompany && (
                                <TextInput
                                    name="lastname"
                                    title="Prénom"
                                    placeholder="Entrer votre prénom"
                                    errorMsg={LAST_NAME_REGEX_MESSAGE}
                                    onError={handleError(setErrorData)}
                                    onChange={(e) => handleInputChange(setInputs, e)}
                                    value={inputs.lastname}
                                    pattern={LAST_NAME_REGEX}
                                    block
                                />
                            )}
                        </div>
                        <div className="w-full space-y-6"><TextInput
                            name="email"
                            title="Email"
                            type="email"
                            placeholder="Entrer votre email"
                            onError={handleError(setErrorData)}
                            onChange={(e) => handleInputChange(setInputs, e)}
                            value={inputs.email}
                            errorMsg={EMAIL_REGEX_MESSAGE}
                            pattern={EMAIL_REGEX}
                            block
                        />
                            <TextInput
                                name="phone"
                                title="Telephone"
                                type="texte"
                                placeholder="Entrer votre numéro de téléphone"
                                onError={handleError(setErrorData)}
                                onChange={(e) => handleInputChange(setInputs, e)}
                                value={inputs.phone}
                                pattern={PHONE_REGEX}
                                errorMsg={PHONE_REGEX_MESSAGE}
                                block
                            />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-6 w-full">
                        <TextInput
                            name="adress"
                            title="Adresse"
                            type="texte"
                            placeholder="L'adresse ne doit pas etre vide"
                            errorMsg="Entrer une adresse valide"
                            pattern={/^.{6,}$/} //}
                            onError={handleError(setErrorData)}
                            onChange={(e) => handleInputChange(setInputs, e)}
                            value={inputs.adress}
                            block
                        />

                        <TextArea
                            name="bio"
                            title="Description *"
                            placeholder="Entrer une description"
                            onError={handleError(setErrorData)}
                            onChange={(e) => handleInputChange(setInputs, e)}
                            value={inputs.bio}
                            required={false}
                            block
                        />
                    </div>
                </div>
                {/*</div>*/}
                <Button disabled={fieldError} block>
                    Suivant
                </Button>
            </form>
        </motion.section>
    );
};

export default RegisterIdentification;
