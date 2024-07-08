import { Button, TextInput } from "../../../styles/components";
import { SERVERLINK } from "../../../constants";
import { useAuth } from "../../../context/AuthProvider";

const RegisterPass = () => {
  const {inputs, setInputs, setAuth, getInformation} = useAuth();
  
  const {
    firstname,
    lastname,
    usercin,
    companynumber,
    phone,
    adress,
    email,
    bio,
    profileimage,
    accountid,
    password,
    confirmPassword,
  } = inputs;

  console.log(inputs);

  const handleChange = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();

    try {
      const body = {
        firstname,
        lastname,
        usercin,
        companynumber,
        phone,
        adress,
        email,
        bio,
        profileimage,
        accountid,
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

  return (
    <section className="w-fullscreen">
      <div className="flex mt-5 ml-3">
        <span className="w-[5px] h-[100px] bg-maintr-100 mr-2"></span>
        <div>
          <p className="text-subtitle-2 boxShadow text-gray-100">
            Connectez-vous pour commencer a utiliser
          </p>
          <br />
          <p className="text-subtitle-1">
            Media <span className="text-maintr-100">Trans</span>
          </p>
        </div>
      </div>
      <form
        className="mt-[10px] flex justify-center items-center"
        onSubmit={onSubmitForm}
      >
        <div>
          <div className="mb-[50px] flex items-center justify-center mr-5 text-subtitle-3">
            <span className="bi bi-arrow-left bg-primary-60 py-2 px-4 rounded-[50%]"></span>
          </div>
          <div className="mb-5">
            <label htmlFor="password" className="text-small-1 text-gray-100">
              Mot de passe
            </label>
            <TextInput
              onChange={(e) => handleChange(e)}
              className="w-[275px]"
              type="password"
              placeholder=""
              name="password"
              id="password"
            />
          </div>
          <div className="mb-5">
            <label
              htmlFor="confirmPassword"
              className="text-small-1 text-gray-100"
            >
              Confirmez
            </label>
            <TextInput
              onChange={(e) => handleChange(e)}
              className="w-[275px]"
              type="password"
              placeholder=""
              name="confirmPassword"
              id="password"
            />
          </div>
          <Button className="w-[275px] mt-5">Creer le compte</Button>
        </div>
      </form>
      <div className="mt-[10px]">
        <div>
          <a href="\mdp" className="text-small-2 text-gray-100">
            Déjà inscris ?
          </a>
        </div>
        <Button className="w-[275px] mt-5">Se connecter</Button>
      </div>
    </section>
  );
};

export default RegisterPass;
