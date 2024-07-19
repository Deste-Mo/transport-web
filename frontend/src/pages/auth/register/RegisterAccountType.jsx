import { Link, useNavigate } from "react-router-dom";
import { Button, SelectInput } from "../../../styles/components.js";
import { useAuth } from "../../../context/AuthProvider.jsx";
import { useForm } from "../../../context/FormProvider.jsx";
import { ACCOUNT_TYPES, REGISRATION_STEPS } from "../../../constants/index.js";

const RegisterAccountType = () => {
  const {
    inputs,
    setInputs,
    setErrorData,
    errorData,
    setRegisterMode,
    setRegistrationStep,
  } = useAuth();
  const { handleInputChange, handleError } = useForm();

  const navigate = useNavigate();

  const accountTypes = [ACCOUNT_TYPES.camion, ACCOUNT_TYPES.client, ACCOUNT_TYPES.society];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (accountTypes.some((accountType) => inputs.accountId === accountType)) {
      setRegisterMode(inputs.accountId);
      setRegistrationStep(REGISRATION_STEPS.identification);
      navigate("/registerIdentification");
    } else {
      console.log("Account type not found");
    }
  };

  return (
    <section className="w-fullscreen bg-gray-80 auth-section space-y-[128px] absolute top-[128px] left-1/2 -translate-x-1/2 ">
      <div className="h1 text-subtitle-1 w-full text-center">
        Selectionner votre{" "}
        <span className="text-primary-100">type de compte</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <form
          className="flex flex-col  border border-black-20 bg-white-100 items-start justify-center gap-[32px] w-fit p-4 rounded-xl"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-col items-start w-full justify-center gap-6">
            <h3 className="text-subtitle-3 text-black-100">Type de compte</h3>
            <div className="flex flex-col items-center justify-center">
              <SelectInput
                title="Compte pour"
                name="accountId"
                variant="fill"
                options={accountTypes.map((accountType) => ({
                  option: accountType,
                }))}
                onError={handleError(setErrorData)}
                onChange={(e) => handleInputChange(setInputs, e)}
              />
            </div>
          </div>
          <Button disabled={errorData.accountid} block>
            Suivant
          </Button>
          <p className="text-small-1 text-black-80">
            Deja membre ?{" "}
            <Link to="/login" className="text-primary-100 underline">
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};
export default RegisterAccountType;
