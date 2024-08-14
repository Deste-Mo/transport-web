import { Link } from "react-router-dom";


const WaitLink = () => {

    return (
        <section
        className="w-fullscreen  auth-section space-y-[128px] absolute top-[128px] left-1/2 -translate-x-1/2 ">
        <div className="h1 text-subtitle-1 w-full text-center text-black-100 dark:text-white-100">
            Verifier votre
            <span className="text-primary-100">Email</span>
        </div>
        {/* Main Form */}
        <div className="flex flex-col items-center justify-center">
            Nous avons envoyer un lien pour reinitialiser votre mot de passe
            verifier votre email, le lien ne durera que 10 minute
            <p className="text-small-1 text-black-80 dark:text-white-80">
                <Link to="https://mail.google.com/mail/u/0/#inbox" className="text-primary-100 underline">
                        Voir votre email
                </Link>
            </p>
        </div>
    </section>
    );
}

export default WaitLink;