import {Button, Icon, TextInput} from "../../../styles/components";
import {
    REGISRATION_STEPS,
    SERVERLINK,
    ACCOUNT_TYPES,
    PASSWORD_REGEX,
    PASSWORD_REGEX_MESSAGE,
    TOAST_TYPE
} from "../../../constants";
import {useAuth} from "../../../context/AuthProvider";
import {useForm} from "../../../context/FormProvider";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useAnimation} from "../../../context/AnimationProvider.jsx";

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
    
    const {setMessagePopup} = useAnimation();

    // console.log(inputs);

    const {handleInputChange, handleError} = useForm();
    const [fieldError, setFieldError] = useState(false);
  const [verificationStep, setVerificationStep] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
  const [codeExpiration, setCodeExpiration] = useState(null);
  const [resendEnabled, setResendEnabled] = useState(false);
  const [resendTimer, setResendTimer] = useState(60); // 60 seconds timer for resending the code

    const handleSubmit = async (e) => {
        e.preventDefault();
    setLoading(true);

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
        accountid:
          accountId === ACCOUNT_TYPES.camion
            ? 2
            : accountId === ACCOUNT_TYPES.society
            ? 1
            : 3,
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
        setVerificationStep(true);
        setCodeExpiration(new Date(Date.now() + 1 * 60000));
        setMessagePopup(
          "Un code de vérification a été envoyé à votre email.",
          TOAST_TYPE.success
        );
      } else {
        setMessagePopup(data.error, TOAST_TYPE.error);
      }
    } catch (e) {
      console.error(e);
      setMessagePopup(
        "Une erreur s'est produite. Veuillez réessayer.",
        TOAST_TYPE.error
      );
    } finally {
      setLoading(false);
    }
  };

  const onVerifyCode = async (e) => {
    e.preventDefault();
    setLoading(true);

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

    const body = {
      code: verificationCode,
      firstname,
      lastname,
      usercin: userCin,
      companynumber: companyNumber,
      phone,
      adress,
      email,
      bio,
      profileimage: profileImage,
      accountid:
        accountId === ACCOUNT_TYPES.camion
          ? 2
          : accountId === ACCOUNT_TYPES.society
          ? 1
          : 3,
      password,
      confirmPassword,
    };

    try {
      const response = await fetch(SERVERLINK + "/api/auth/verify-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (!parseRes.error) {
        // Enregistrement réussi
        login(parseRes.token);
        setMessagePopup("Compte vérifié avec succès !", TOAST_TYPE.success);
        navigate("/home");
      } else {
        setMessagePopup(
          parseRes.error || "Le code de vérification est invalide.",
          TOAST_TYPE.error
        );
      }
    } catch (error) {
      setMessagePopup(
        "Une erreur s'est produite. Veuillez réessayer.",
        TOAST_TYPE.error
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to handle resend verification code
  const resendCode = async () => {
    setLoading(true);
    try {
      const response = await fetch(SERVERLINK + "/api/auth/resend-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: inputs.email }),
      });

      const data = await response.json();

      if (!data.error) {
        setCodeExpiration(new Date(Date.now() + 1 * 60000)); // Reset expiration time
        setResendTimer(60); // Reset resend timer
        setResendEnabled(false);
        setMessagePopup(
          "Un nouveau code a été envoyé à votre email.",
          TOAST_TYPE.success
        );
      } else {
            setMessagePopup(data.error, TOAST_TYPE.error);
      }
        } catch (e) {
            console.error(e);
      setMessagePopup(
        "Une erreur s'est produite lors de l'envoi du code.",
        TOAST_TYPE.error
      );
    } finally {
      setLoading(false);
    }
    };
    
  // Countdown timer for resending the code
  useEffect(() => {
    let interval;
    if (resendTimer > 0 && !resendEnabled) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    } else {
      setResendEnabled(true);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

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
            className="auth-section">
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

      {verificationStep ? (
        // Verification form (Step 2)
        <form className="auth-form mx-auto" onSubmit={onVerifyCode}>
          <h3 className="text-subtitle-3 text-black-100 dark:text-white-100">
            Vérification
          </h3>
          <div className="flex flex-col items-start justify-center gap-6 w-full">
            <TextInput
              name="code"
              title="Code de vérification"
              type="text"
              placeholder="Entrez votre code"
              onChange={(e) => setVerificationCode(e.target.value)}
              block
            />
            <Button className="w-full" disabled={loading}>
              {loading ? "Vérification..." : "Vérifier"}
            </Button>
            {codeExpiration && (
              <p className="text-red-500">
                Le code expire à {codeExpiration.toLocaleTimeString()}.
              </p>
            )}
            <Button
              className="w-full"
              onClick={resendCode}
              disabled={!resendEnabled}
            >
              {resendEnabled
                ? "Renvoyer le code"
                : `Renvoyer le code dans ${resendTimer}s`}
            </Button>
          </div>
        </form>
      ) : (
        // Registration form (Step 1)
        <form className="auth-form mx-auto" onSubmit={handleSubmit}>
          <h3 className="text-subtitle-3 text-black-100 dark:text-white-100">
            Sécurité
          </h3>
                    <div className="flex flex-col items-start justify-center gap-6 w-full">
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
                            block
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
                            block
                        />
            <Button disabled={fieldError || loading} block>
              {loading ? "Enregistrement..." : "Terminer"}
                </Button>
          </div>
            </form>
      )}
        </section>
    );
};

export default RegisterSecurity;
