import { appVariants } from '../../animations/variants';
import { Header } from '../../components/pages/Header';
import { SERVERLINK, TOAST_TYPE } from '../../constants';
import { useAuth } from '../../context/AuthProvider';
import { Button } from '../../styles/components';
import { motion } from "framer-motion";
import { Navigate, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAnimation } from '../../context/AnimationProvider';

const SubscriptionCard = ({ title, price, features, onSelect, radioIdPrefix, setValue, setChecked }) => (
  <motion.div
    whileHover={{ scale: 1.02, borderColor: "#FBCB34", boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
    className="flex bg-white-100 flex-col justify-between items-center min-w-[300px] min-h-[450px] w-[320px] p-6 bg-white rounded-xl border border-gray-300 transition-transform duration-300"
  >
    <h2 className="text-2xl font-semibold mb-4 text-gray-900">{title}</h2>
    <p className="text-lg text-gray-700 mb-6">{price} Ar/mois</p>
    <ul className="space-y-2 mb-6 text-gray-600">
      {features.map((feature, index) => (
        <li key={index} className="flex items-center">
          <span className="inline-block w-2 h-2 mr-2 bg-primary-100 rounded-full"></span>
          {feature}
        </li>
      ))}
    </ul>
    <div className="w-full mb-4">
      {["Mvola", "Airtel"].map((provider) => (
        <div key={provider} className="flex items-center mb-2">
          <input 
            type='radio' 
            name='paiement' 
            onChange={(e) => setValue(e.target.id)} 
            onClick={(e) => setChecked(e.target.value)} 
            id={`${provider}${radioIdPrefix}`} 
            required 
            className="mr-2"
          />
          <label htmlFor={`${provider}${radioIdPrefix}`} className="text-gray-900">{provider} Money</label>
        </div>
      ))}
    </div>
    <Button onClick={onSelect} block className="w-full">Choisir</Button>
  </motion.div>
);

const SubscriptionPage = () => {
  const { token, loading, personalInformation } = useAuth();

  

  const navigate = useNavigate();

  const {setMessagePopup} = useAnimation();

  const subscriptions = [
    { title: 'Basique', price: 500000, features: ["Vous obtenez 30 jours d'abonnement"] },
    { title: 'Standard', price: 100000, features: ["Vous obtenez 60 jours d'abonnement"] },
    { title: 'Premium', price: 200000, features: ["Vous obtenez 1 an d'abonnement"] },
    { title: 'Premium', price: 200000, features: ["Vous obtenez 1 an d'abonnement"] },
  ];

  const [value, setValue] = useState('');
  const [check, setCheck] = useState('');

  const handleSelect = (type) => {
    if (check === "on") {
      navigate(`/abonnement/${type}/${value.slice(0, -1)}/paiement`);
    }else{
      setMessagePopup("Veuillez selectionne le type de paiement", TOAST_TYPE.error);
    }
  };

  if (loading) {
    return <p className="text-black-100 text-title-3 text-primary-60 flex h-[100vh] w-full justify-center items-center">Loading ...</p>;
  }

  if (!token) {
    return <Navigate to="/login" />;
  }

  const profileImage = `${SERVERLINK}/${personalInformation.profile || "X.png"}`;

  return (
    <section className="relative scrollbar-none">
      <Header profileImage={profileImage} />
      <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <motion.section className="flex flex-col items-center justify-center gap-6 w-full" variants={appVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <div className="text-center text-gray-900 dark:text-white-100 text-[2em] font-bold mt-12">
            Choisissez un <span className="text-primary-100">abonnement</span>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-6 w-full p-8">
            {subscriptions.map((subscription, index) => (
              <SubscriptionCard
                key={index}
                radioIdPrefix={index}
                title={subscription.title}
                price={subscription.price}
                features={subscription.features}
                onSelect={() => handleSelect(subscription.title)}
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
