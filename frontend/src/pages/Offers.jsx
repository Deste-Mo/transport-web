import { useAuth } from "../context/AuthProvider.jsx";
import { SubHeader } from "../components/pages/SubHeader.jsx";
import OfferCard from "../components/pages/Offer/OfferCard.jsx";
import { Icon } from "../styles/components.js";
import { appVariants } from "../animations/variants.js";
import { motion } from "framer-motion";
import { useApp } from "../context/AppPorvider.jsx";
import { useEffect } from "react";

const Offers = () => {
    const { personalInformation, logout, setRegistrationStep } = useAuth();

    const { handleOfferSuggestion, suggestions } = useApp();

    useEffect(() => {
        handleOfferSuggestion();
    }, [])


    const user = personalInformation;

    return (
        <motion.section className="flex flex-col items-center justify-center w-full gap-6" variants={appVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>

            <SubHeader name="Offres" icon="bi bi-briefcase-fill" sticky rightContent={<Icon size="sm" variant="secondary" icon="bi bi-search" />} />
            <div className="flex flex-col items-center justify-center gap-6 w-full">
                {
                    suggestions.length > 0 ? (
                        suggestions.map((suggestion) => (<OfferCard key={suggestion.offerid} sug={suggestion} />))
                    ) : 
                    <div>No offers</div>
                }
            </div>
        </motion.section>
    );
};

export default Offers;
