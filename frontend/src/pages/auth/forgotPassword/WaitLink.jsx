import {Link, useNavigate} from "react-router-dom";
import Button from "../../../components/ui/Button.jsx";
import {Icon} from "../../../styles/components.js";

const WaitLink = () => {
    const navigate = useNavigate();
    return (
        <section className="w-full h-screen flex flex-col gap-10 items-center justify-center">
            <div className={'flex gap-2 text-lead flex-col items-center text-text-l dark:text-text-d'}><Icon onClick={() => navigate('/')} variant={'secondary-2'} icon={'bi bi-arrow-left'} size={'sm'}/> <p>Retourner vers la page de connexion</p></div>
            <div className="text-center flex flex-col gap-6 max-w-lg max-md:w-[94%] mx-auto p-8 bg-secondary-l dark:bg-secondary-d rounded-xl ">
                <div className={'flex flex-col gap-1'}>
                    <i className={'bi bi-envelope text-[48px] text-text-l dark:text-text-d'}/>
                    <h1 className="text-subtitle-2 text-text-l dark:text-text-d ">
                        Vérifiez votre <span className="text-primary-500">Email</span>
                    </h1>
                </div>
                <p className="text-lg text-text-sec-l dark:text-text-sec-d">
                    Nous avons envoyé un lien pour réinitialiser votre mot de passe. Vérifiez votre email, le lien ne durera que 10 minutes.
                </p>
                <div className="w-full flex items-center justify-center">
                    <Button to="https://mail.google.com" variant={'primary'}>
                        Ouvrir Gmail
                    </Button>
                </div>
            </div>
        </section>
    );
}

export default WaitLink;
