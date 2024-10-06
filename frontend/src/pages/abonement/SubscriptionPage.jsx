import {appVariants} from '../../animations/variants';
import {Header} from '../../components/pages/Header';
import {SERVERLINK, TOAST_TYPE} from '../../constants';
import {useAuth} from '../../context/AuthProvider';
import {Button, Icon} from '../../styles/components';
import {motion} from "framer-motion";
import {Navigate, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import {useAnimation} from '../../context/AnimationProvider';
import {useUser} from '../../context/UserProvider';
import DefaultLoader from "../../components/loader/DefaultLoader.jsx";

const SubscriptionCard = ({id, title, price, features, onSelect, radioIdPrefix, setValue, setChecked}) => (
    <motion.div
        // whileHover={{ scale: 1.02, borderColor: "#FBCB34", boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
        className="flex bg-white-100 gap-10 flex-col  items-center max-sm:w-full w-[360px] p-4 bg-white rounded-xl dark:bg-[#1e1e1e] "
    >
        <h2 className="text-[24px] text-primary-80 dark:text-primary-100">{title[0].toLocaleUpperCase() + title.slice(1).toLocaleLowerCase()}</h2>
        <div className="flex flex-col gap-1 justify-center items-center"><p
            className="text-[30px] text-black-100 dark:text-white-100 ">{price} Ar </p>
            <span className="text-base text-black-100 dark:text-white-100">Mois</span></div>
        <div key={id} className="flex items-center text-base text-gray-500 dark:text-white-80">
            {features} d'access
        </div>
        <div className="w-full space-y-4 text-black-100 text-base  dark:text-white-100">
            <p className="text-center">Mode de payement</p>
            <div className={"space-y-2 w-full"}>
                {["Mvola", "Airtel"].map((provider) => (
                    <div key={provider} className="text-small-1 flex justify-center gap-2 w-full">
                        <input
                            type='radio'
                            name='paiement'
                            onChange={(e) => setValue(e.target.id)}
                            onClick={(e) => setChecked(e.target.value)}
                            id={`${provider}${radioIdPrefix}`}
                            required
                            className=""
                        />
                        <label htmlFor={`${provider}${radioIdPrefix}`}
                               className=" cursor-pointer">{provider} Money</label>
                    </div>
                ))}
            </div>

        </div>
        <Button onClick={onSelect} block className="w-full">Choisir</Button>
    </motion.div>
);

const SubscriptionPage = () => {
    const {token, loading, personalInformation} = useAuth();
    const navigate = useNavigate();
    const {setMessagePopup, setShowMessagePopup} = useAnimation();
    const {getAllSubscription, subscriptionCards, handleSendEmailConf} = useUser();

    const [value, setValue] = useState('');
    const [check, setCheck] = useState('');

    const handleSelect = (title, id, subid, montant) => {
        if (check === "on") {
            navigate(`/abonnement/${title}/${montant}/${value.slice(0, -1)}/paiement`);
            handleSendEmailConf(id, subid);
        } else {
            setMessagePopup("Veuillez selectionne le type de paiement", TOAST_TYPE.error);
        }
    };

    useEffect(() => {
        getAllSubscription();
    }, []);


    if (loading) {
        return <DefaultLoader/>
    }

    if (!token) {
        return <Navigate to="/login"/>;
    }

    const profileImage = `${SERVERLINK}/${personalInformation.profile || "X.png"}`;

    return (
        <section className="relative scrollbar-none p-4">
            <div className="flex flex-col items-center justify-center min-h-screen ">
                <motion.section className="flex flex-col items-center justify-center gap-[64px] w-full"
                                variants={appVariants} initial="hidden" whileInView="visible" viewport={{once: true}}>
                    <div className="flex flex-col items-center justify-center gap-6">
                        <Button onClick={() => navigate("/")} icon="bi bi-arrow-left" children="Retourner vers l'application" variant="secondary"/>
                        <div
                            className="text-center text-gray-900 dark:text-white-100 md:text-[40px] text-subtitle-1 max-md:text-subtitle-1 font-bold">
                            Choisissez un <span className="text-primary-100">abonnement</span>
                        </div>
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-6 w-full gap-6">
                        {subscriptionCards.map((subscription) => (
                            <SubscriptionCard
                                key={subscription.subid}
                                id={subscription.subid}
                                radioIdPrefix={subscription.subid}
                                title={subscription.label}
                                price={subscription.price}
                                features={`${subscription.duration} Jours`}
                                onSelect={() => handleSelect(subscription.label, personalInformation.id, subscription.subid, subscription.price)}
                                setValue={setValue}
                                setChecked={setCheck}
                            />
                        ))}
                    </div>
                </motion.section>
            </div>
        </section>
    );
};

export default SubscriptionPage;
