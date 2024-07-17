import { useNavigate } from "react-router-dom";
import { Button, Icon, TextArea, TextInput } from "../../styles/components.js";
import { useAuth } from "../../context/AuthProvider.jsx";
import { useForm } from "../../context/FormProvider.jsx";
import { useEffect, useState } from "react";

const Labo = () => {
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
        getUserInformation();
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
    <section className="absolute left-1/2 -translate-x-1/2 w-fullscreen bg-gray-80 auth-section space-y-[128px] top-[128px]">
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex w-full items-center justify-center">
          <Icon icon="bi bi-arrow-left" onClick={() => navigate(-1)} />
        </div>
        <div className="w-full text-center h1 text-subtitle-1">
          Créer un <span className="text-primary-100">mot de passe</span>
        </div>
      </div>
      <form
        className="flex w-fit flex-col items-start justify-center rounded-xl border p-4 border-black-20 bg-white-100 gap-[32px]"
        onSubmit={handleSubmit}
      >
        <div className="flex w-full flex-col items-start justify-center gap-6">
          <h3 className="text-subtitle-3 text-black-100">Identification</h3>
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

export default Labo;
