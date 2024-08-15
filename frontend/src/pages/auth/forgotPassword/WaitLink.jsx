import { Link } from "react-router-dom";

const WaitLink = () => {
    return (
        <section className="w-full h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="text-center max-w-lg mx-auto p-8 bg-white rounded-xl shadow-xl bg-white-100">
                <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
                    Vérifiez votre <span className="text-primary-500">Email</span>
                </h1>
                <p className="text-lg text-gray-700 mb-8">
                    Nous avons envoyé un lien pour réinitialiser votre mot de passe. Vérifiez votre email, le lien ne durera que 10 minutes.
                </p>
                <div className="flex justify-center items-center mb-8">
                    <svg
                        className="animate-spin h-16 w-16 text-primary-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 0116 0A8 8 0 014 12z"></path>
                    </svg>
                </div>
                <p className="text-sm text-gray-600">
                    <Link to="https://mail.google.com/mail/u/0/#inbox" className="text-primary-100 font-semibold hover:underline">
                        Voir votre email
                    </Link>
                </p>
            </div>
        </section>
    );
}

export default WaitLink;
