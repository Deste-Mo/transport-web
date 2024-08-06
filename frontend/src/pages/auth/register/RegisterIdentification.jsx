import {useNavigate} from "react-router-dom";
import {Button, Icon, TextArea, TextInput} from "../../../styles/components";
import {useAuth} from "../../../context/AuthProvider";
import {useForm} from "../../../context/FormProvider";
import {useEffect, useState} from "react";
import {
    ACCOUNT_TYPES,
    CIN_REGEX,
    EMAIL_REGEX,
    NAME_REGEX,
    NIF_STAT_REGEX,
    PHONE_REGEX,
    REGISRATION_STEPS
} from "../../../constants";

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
                firstname || companyNumber || email || phone || adress || bio
            );
        } else {
            setFieldError(
                firstname || userCin || email || phone || adress || bio || lastname
            );
        }
    }, [inputs, errorData]);

    return (
        <section
            className="absolute left-1/2 -translate-x-1/2 w-fullscreen  auth-section space-y-[64px] top-[64px]">
            <div className="flex flex-col items-center justify-center gap-4">
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
                    Entrer vos <span className="text-primary-100">identifications</span>
                </div>
            </div>
            <form
                className="flex w-fit flex-col items-start justify-center rounded-xl border p-6 border-black-0 bg-white-100 dark:border-none dark:bg-white-10 gap-[32px]"
                onSubmit={handleSubmit}
            >
                <div className="flex w-full flex-col items-start justify-center gap-6">
                    <h3 className="text-subtitle-3 text-black-100 dark:text-white-100">Identification</h3>
                    <div className="flex flex-row items-start justify-center gap-6">
                        <div className="flex flex-col items-center justify-center gap-6">
                            {isAccountTypeForCompany ? (
                                <TextInput
                                    name="companyNumber"
                                    title="Numéro de l'entreprise"
                                    placeholder=""
                                    onError={handleError(setErrorData)}
                                    onChange={(e) => handleInputChange(setInputs, e)}
                                    value={inputs.companyNumber}
                                    errorMsg="NIF STAT inccorect"
                                    pattern={NIF_STAT_REGEX}
                                />
                            ) : (
                                <TextInput
                                    name="userCin"
                                    title="CIN"
                                    placeholder="Entrer votre CIN"
                                    errorMsg="CIN incorrect"
                                    pattern={CIN_REGEX}
                                    onError={handleError(setErrorData)}
                                    onChange={(e) => handleInputChange(setInputs, e)}
                                    value={inputs.userCin}
                                />
                            )}

                            <TextInput
                                name="firstname"
                                title="Nom"
                                placeholder={
                                    isAccountTypeForCompany
                                        ? "Entrer le nom de l'entreprise"
                                        : "Entrer votre nom"
                                }
                                errorMsg="Le nom doit avoir au moin 4 charachtères"
                                onError={handleError(setErrorData)}
                                onChange={(e) => handleInputChange(setInputs, e)}
                                value={inputs.firstname}
                                pattern={NAME_REGEX}
                            />
                            {!isAccountTypeForCompany && (
                                <TextInput
                                    name="lastname"
                                    title="Prénom"
                                    placeholder="Entrer votre prénom"
                                    errorMsg="Le prénom doit avoir au moin 4 charachtères"
                                    onError={handleError(setErrorData)}
                                    onChange={(e) => handleInputChange(setInputs, e)}
                                    value={inputs.lastname}
                                    pattern={NAME_REGEX}
                                />
                            )}
                            <TextInput
                                name="email"
                                title="Email"
                                type="email"
                                placeholder="Entrer votre email"
                                onError={handleError(setErrorData)}
                                onChange={(e) => handleInputChange(setInputs, e)}
                                value={inputs.email}
                                errorMsg="Email incorrect"
                                pattern={EMAIL_REGEX}
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
                                errorMsg="Numéro de téléphone incorrect"
                            />
                        </div>
                        <div className="flex flex-col items-center justify-center gap-6">
                            <TextInput
                                name="adress"
                                title="Adresse"
                                type="texte"
                                placeholder="Entrer votre adresse"
                                onError={handleError(setErrorData)}
                                onChange={(e) => handleInputChange(setInputs, e)}
                                value={inputs.adress}
                            />
                            
                            <TextArea
                                name="bio"
                                title="Description"
                                placeholder="Entrer une description"
                                onError={handleError(setErrorData)}
                                onChange={(e) => handleInputChange(setInputs, e)}
                                value={inputs.bio}
                            />
                        </div>
                    </div>
                </div>
                <Button disabled={fieldError} block>
                    Suivant
                </Button>
            </form>
        </section>
    );
};

export default RegisterIdentification;
