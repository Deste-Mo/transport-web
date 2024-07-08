import TextInput from "../../components/ui/TextInput";
import Button from "../../components/ui/Button";
import { Link } from "react-router-dom";
import { SERVERLINK } from "../../constants";
import { useState } from "react";

const Login = ({ setAuth, getInformation }) => {

    const [inputs, setinputs] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");

    const { email, password } = inputs;


    const inputsOnChange = (e) => {
        setinputs({ ...inputs, [e.target.name]: e.target.value });
        setError("");
    };


    const handleLogin = async (e) => {
        e.preventDefault();

        const body = { email, password };

        const response = await fetch(SERVERLINK + "/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })

        const parseRs = await response.json();

        if (!parseRs.error) {
            localStorage.setItem("token", parseRs.token);
            setAuth(true);
            getInformation();
        }
        setError(parseRs.error);
        console.log(parseRs);
    }


    return (
        <section className="w-fullscreen">
            <div className="flex mt-5 ml-3 relative">
                <span className="w-[5px] h-[100px] bg-maintr-100 mr-2"></span>
                <div>
                    <p className="text-subtitle-2 boxShadow text-gray-100">Connectez-vous pour commencer a utiliser</p><br />
                    <p className="text-subtitle-1">Media <span className="text-maintr-100">Trans</span></p>
                </div>
            </div>
            <form className="mt-[10px] flex justify-center items-center" onSubmit={handleLogin}>
                <div>
                    <div className="mb-5">
                        <label htmlFor="email" className="text-small-1 text-gray-100">Email</label>
                        <TextInput
                            className="w-[275px]"
                            type="text"
                            placeholder=""
                            name="email"
                            id="email"
                            onChange={(e) => inputsOnChange(e)}
                        />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="text-small-1 text-gray-100">Mot de passe</label>
                        <TextInput
                            className="w-[275px]"
                            type="password"
                            placeholder=""
                            name="password"
                            id="password"
                            onChange={(e) => inputsOnChange(e)}
                        />
                    </div>
                    <div>
                        <a href="\mdp" className="text-small-2 text-maintr-100">Mot de passe oublié</a>
                    </div>
                    <Button className="w-[275px] mt-5">Se connecter</Button>
                </div>
            </form>
            <div className="flex ml-[30px] md:justify-end sm:justify-center xsm:justify-center md:mr-[200px]">
                <div>
                    <div className="block">
                        <a href="\mdp" className="text-small-2 text-gray-100">Pas de Compte ?</a>
                    </div>
                    <Link to={'/register'}><Button className="w-[275px] mt-5">Creer un compte</Button></Link>
                </div>
            </div>
        </section>
    )
}

export default Login;