import {appVariants} from '../../animations/variants';
import {Header} from '../../components/pages/Header';
import {SERVERLINK} from '../../constants';
import {motion} from "framer-motion";
import {Navigate, useNavigate, useParams} from 'react-router-dom';
import {useAuth} from '../../context/AuthProvider';
import {useState} from 'react';
import DefaultLoader from "../../components/loader/DefaultLoader.jsx";
import {Button} from "../../styles/components.js";

const SubscriptionSecurity = () => {
    const {token, loading, personalInformation} = useAuth();
    const location = useParams();
    const navigate = useNavigate();

    const {id, montant} = useParams();

    const user = personalInformation;

    return (
        loading ? (
            <div className="flex h-screen w-full justify-center items-center bg-gray-100">
                <DefaultLoader/>
            </div>
        ) : !token ? (
            <Navigate to="/login"/>
        ) : (
            <motion.section
                className="flex flex-col items-center justify-center min-h-screen p-4 gap-[64px]"
                variants={appVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{once: true}}
            >
                <div className="flex flex-col items-center justify-center gap-6">
                    <Button onClick={() => navigate("/abonnement")} icon="bi bi-arrow-left"
                            children="Choix d'abonnement" variant="secondary"/>
                    <div
                        className="text-center text-gray-900 dark:text-white-100 md:text-[40px] text-subtitle-1 max-md:text-subtitle-1 font-bold">
                        <span className="text-primary-100">Résumé</span> de votre payement
                    </div>
                </div>
                <div className="flex flex-col items-center w-full max-w-4xl gap-6 ">
                    <PaymentSummary user={user} id={id} montant={montant}/>
                    <PaymentLastStep location={location}/>
                </div>
            </motion.section>
        )
    );
};

export default SubscriptionSecurity;


const PaymentSummary = ({user, montant, id}) => {
    return (
        <div
            className="w-full bg-white rounded-2xl p-6  bg-white-100 flex flex-col gap-6"
        >
            <h2 className="text-subtitle-3 text-black-100">Récapitulatif</h2>
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                    <th className="py-3 px-4 text-gray-700 font-medium text-sm">Libellé</th>
                    <th className="py-3 px-4 text-gray-700 font-medium text-sm">Description</th>
                </tr>
                </thead>
                <tbody>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">Nom et prénom</td>
                    <td className="py-3 px-4 text-gray-700">{user.fullName}</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">Numéro</td>
                    <td className="py-3 px-4 text-gray-700">{user.phone}</td>
                </tr>
                <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">Abonnement</td>
                    <td className="py-3 px-4 text-gray-700">
                        {id}
                    </td>
                </tr>

                <tr className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-900">Montant à débiter</td>
                    <td className="py-3 px-4 text-gray-700">
                        {montant} Ar
                    </td>
                </tr>

                </tbody>
            </table>
        </div>
    )
}

const PaymentLastStep = ({location}) => {
    return (
        <div
            className="w-full bg-white rounded-2xl p-6  bg-white-100 flex flex-col gap-6"
        >
            <h2 className="text-subtitle-3 text-black-100">Finalisation Paiement {location.type}</h2>
            <div className="space-y-4">
                <PaymentStep step={1}>
                    <p className="">Veuillez cliquer et exécuter le code
                        {location.type === "Mvola" ? (
                            <a href="tel:%23 111*1*2*0385629423*50000*2*2*2 %23"
                               className="text-primary-100 underline "> *111*1*2*0385629423*50000*2*2*# </a>
                        ) : (
                            <a href="tel:%23 *436*2# %23"
                               className="text-primary-100 hover:underline font-bold"> *436*2# </a>
                        )}
                        sur votre mobile {location.type === "Mvola" ? (
                            <span className="text-yellow-400">sans le modifier</span>
                        ) : (
                            <span>et valider le paiement suivant les instructions suivantes : numéro <span
                                className="text-primary-100">033 85 244 25</span>, montant : <span
                                className="text-primary-100">50 000</span> Ariary, référence : peu importe.</span>
                        )}
                    </p>
                </PaymentStep>
                <PaymentStep step={2}>
                    <p className="">Une fois votre transfert effectué dans le délai imparti, le
                        traitement sera effectué dans les prochaines heures.</p>
                </PaymentStep>
                <PaymentStep step={3}>
                    <p><span className="text-primary-100">Cf CGU Art 3.21</span>, n'exécutez le
                        paiement (1) à partir du numéro <span className="text-primary-100">038 05 253 83</span> que si ce numéro est validé par
                        notre système.</p>
                </PaymentStep>
               
            </div>

        </div>
    )
}

const PaymentStep = ({step, children}) => {
    return (
        <div className="flex flex-col gap-2 items-start jusstify-start text-black-100">
            <h1 className="text-small-1 text-black-60 ">Instruction {step}</h1>
            <div>
                {children}
            </div>
        </div>
    )
}