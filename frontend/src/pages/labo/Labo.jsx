import {  useNavigate } from "react-router-dom";
import { Button, TextArea, TextInput } from "../../styles/components.js"
import { useAuth } from "../../context/AuthProvider.jsx";
import { useForm } from "../../context/FormProvider.jsx";
import { useEffect, useState } from "react";


const Labo = () => {
    const { inputs, setInputs, setErrorData, errorData } = useAuth();
    const { handleInputChange, handleError } =
      useForm();
    const [fieldError, setFieldError] = useState(false)
;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/registerPass");
  };

  useEffect(() => {
    // Check if all of the current fielfs are valid
    const {firstname, companyNumber, email, phone, adress, bio} = errorData;
    setFieldError(firstname || companyNumber || email || phone || adress || bio);
  }, [inputs, errorData]);


  return (
    <section className="w-fullscreen bg-gray-80 auth-section space-y-[128px] absolute top-[128px] left-1/2 -translate-x-1/2">
      <div className="h1 text-subtitle-1 w-full text-center">
        Entrer vos <span className="text-primary-100">identifications</span>
      </div>
      <form
        className="flex flex-col  border border-black-20 bg-white-100 items-start justify-center gap-[32px] w-fit p-4 rounded-xl"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col items-start w-full justify-center gap-6">
          <h3 className="text-subtitle-3 text-black-100">Identification</h3>
          <div className="flex flex-row items-start justify-center gap-6">
            <div className="flex flex-col items-center justify-center gap-6">
              <TextInput
                name="companyNumber"
                title="Numéro de l'entreprise"
                placeholder=""
                onError={handleError(setErrorData)}
                onChange={(e) => handleInputChange(setInputs, e)}
                value={inputs.comanyNumber}
              />
              <TextInput
                name="firstname"
                title="Nom de l'entreprise"
                placeholder="Entrer le nom de votre enterprise"
                onError={handleError(setErrorData)}
                onChange={(e) => handleInputChange(setInputs, e)}
                value={inputs.firstname}
              />
              <TextInput
                name="email"
                title="Email"
                type="email"
                placeholder="Entrer votre email"
                onError={handleError(setErrorData)}
                onChange={(e) => handleInputChange(setInputs, e)}
                value={inputs.email}
              />
              <TextInput
                name="phone"
                title="Telephone"
                type="texte"
                placeholder="Entrer votre numéro de téléphone"
                onError={handleError(setErrorData)}
                onChange={(e) => handleInputChange(setInputs, e)}
                value={inputs.phone}
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


export default Labo;
