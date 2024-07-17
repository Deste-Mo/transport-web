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
    <section className="absolute left-1/2 -translate-x-1/2 w-fullscreen bg-gray-80 auth-section space-y-[128px] top-[128px]">
      <div className="w-full text-center h1 text-subtitle-1">
        Selectionner votre{" "}
        <span className="text-primary-100">type de compte</span>
      </div>
      <div className="flex flex-col items-center justify-center">
        <form
          className="flex w-fit flex-col items-start justify-center rounded-xl border p-4 border-black-20 bg-white-100 gap-[32px]"
          onSubmit={handleSubmit}
        >
          <div className="flex w-full flex-col items-start justify-center gap-6">
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
            <Link to="/login" className="underline text-primary-100">
              Se connecter
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};
export default RegisterAccountType;
