import { Link, Route, redirect, useNavigate } from "react-router-dom";
import { Button } from "../../../styles/components";
import { useState } from "react";
import {useAuth} from "../../../context/AuthProvider.jsx";
const Register = () => {
    const {inputs, setInputs} = useAuth();
    
    const navigate = useNavigate();
    const [account, setAcc] = useState(1);

    const handleChange = (e) => {
        setAcc(e.target.value);
        setInputs({ ...inputs, [e.target.name]: e.target.value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(account === 1) {
            navigate('/registerCam');
        }else if(account === 2){
            navigate('/registerEntr');
        }else if(account === 3){
            navigate('/registerCli');
        }else{
            navigate('/register');
        }
    }


    return (
        <section className="w-fullscreen bg-gray-80 pt-[50px] pb-[100px]">
            <div className="flex mt-5 ml-3">
                <span className="w-[5px] h-[100px] bg-maintr-100 mr-2"></span>
                <div>
                    <p className="text-subtitle-2 boxShadow text-gray-100">Creez votre compte</p><br />
                    <p className="text-subtitle-1">Media <span className="text-maintr-100">Trans</span></p>
                </div>
            </div>
            <form className="flex justify-center items-center" onSubmit={handleSubmit}>
                <div className="bg-white-80 py-[40px] px-[20px] rounded-[20px]">
                    <div>
                        <span href="\mdp" className="text-lead text-black-100">Type de compte</span><br />
                        <span className="text-small-1 mt-5 block text-black-80">Compte pour</span>
                        <select className="w-[275px] p-3 border-none mt-3 text-gray-100 outline-none bg-black-10 rounded-[10px]" name="accountid" id="accountid" onChange={handleChange}>
                            <option value="1" className="p-3">Camionneur</option>
                            <option value="2" className="p-3">Entreprise</option>
                            <option value="3" className="p-3">Client</option>
                        </select>
                    </div>
                    <Button className="w-[275px] mt-5">Creer un compte</Button>
                </div>
                <div className="ml-5 mt-[300px] bg-white-80 py-[40px] px-[20px] rounded-[20px]">
                    <div>
                        <a href="\mdp" className="text-small-2 text-gray-100">Déjà Membre ?</a>
                    </div>
                    <Link to={
                        '/login'
                    }>
                        <Button className="w-[275px] mt-5">Se connecter</Button>
                    </Link>
                </div>
            </form>
        </section>
    )
}

export default Register;