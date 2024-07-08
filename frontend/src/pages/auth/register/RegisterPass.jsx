import { Button, Icon, TextInput } from "../../../styles/components";
import { SERVERLINK } from "../../../constants";
import { useAuth } from "../../../context/AuthProvider";
import { useForm } from "../../../context/FormProvider";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterPass = () => {
  const {
    inputs,
    setInputs,
    setErrorData,
    errorData,
    setAuth,
    getInformation,
  } = useAuth();

  const { handleInputChange, handleError } = useForm();
  const [fieldError, setFieldError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const body = {
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
      };

      const response = await fetch(SERVERLINK + "/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (!parseRes.error) {
        localStorage.setItem("token", parseRes.token);
        setAuth(true);
        getInformation();
      }

      console.log(parseRes.error);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // Check if all of the current fielfs are valid
    const { password, confirmPassword } = errorData;
    setFieldError(password || confirmPassword);
  }, [inputs, errorData]);

  return (
    <section className="w-fullscreen bg-gray-80 auth-section space-y-[128px] absolute top-[128px] left-1/2 -translate-x-1/2">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="w-full flex items-center justify-center">
          <Icon icon="bi bi-arrow-left" onClick={() => navigate(-1)} />
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
              title="Adresse"
              type="password"
              placeholder="Entrer votre mot de passe"
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
          Suivant
        </Button>
      </form>
    </section>
  );
};

export default RegisterPass;
