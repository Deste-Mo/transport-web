import TextInput from "../../components/ui/TextInput";
import Button from "../../components/ui/Button";

const RegisterPass = () => {
    return (
        <section className="w-fullscreen">
            <div className="flex mt-5 ml-3">
                <span className="w-[5px] h-[100px] bg-maintr-100 mr-2"></span>
                <div>
                    <p className="text-subtitle-2 boxShadow text-gray-100">Connectez-vous pour commencer a utiliser</p><br />
                    <p className="text-subtitle-1">Media <span className="text-maintr-100">Trans</span></p>
                </div>
            </div>
            <form className="mt-[10px] flex justify-center items-center">
                <div>
                    <div className="mb-[50px] flex items-center justify-center mr-5 text-subtitle-3">
                        <span className="bi bi-arrow-left bg-primary-60 py-2 px-4 rounded-[50%]"></span>
                    </div>
                    <div className="mb-5">
                        <label htmlFor="password" className="text-small-1 text-gray-100">Mot de passe</label>
                        <TextInput className="w-[275px]" type="password" placeholder="" name="password" id="password" />
                    </div>
                    <div className="mb-5">
                        <label htmlFor="confirmPassword" className="text-small-1 text-gray-100">Confirmez</label>
                        <TextInput className="w-[275px]" type="confirmPassword" placeholder="" name="confirmPassword" id="password" />
                    </div>
                    <Button className="w-[275px] mt-5">Creer le compte</Button>
                </div>
                <div className="mt-[300px]">
                    <div>
                        <a href="\mdp" className="text-small-2 text-gray-100">Déjà inscris ?</a>
                    </div>
                    <Button className="w-[275px] mt-5">Se connecter</Button>
                </div>
            </form>
        </section>
    )
}

export default RegisterPass;