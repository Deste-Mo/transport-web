
import {useAuth} from "../context/AuthProvider.jsx";
import {SubHeader} from "../components/pages/SubHeader.jsx";
import OfferCard from "../components/pages/Offer/OfferCard.jsx";
import {appVariants} from "../animations/variants.js";
import {motion} from "framer-motion";
import ExpandableSearchBar from "../components/ui/ExpandableSearchBar.jsx";
import {useApp} from "../context/AppPorvider.jsx";
import {useEffect} from "react";

const Offers = ({userId = null}) => {
    const { personalInformation } = useAuth();

    const { handleOfferSuggestion, suggestions, handleOffersSaved, savedOffers } = useApp();

    useEffect(() => {
        handleOfferSuggestion();
        handleOffersSaved();
    }, [])

    const user = personalInformation;

    return (
        <motion.section className="flex flex-col items-center justify-center w-full gap-6" variants={appVariants} initial="hidden" whileInView="visible" viewport={{once : true}}>

            <SubHeader name="Offres" icon="bi bi-briefcase-fill" sticky  rightContent={<ExpandableSearchBar/>}/>
            <div className="flex flex-col items-center justify-center gap-6 w-full">
                {
                    suggestions.length > 0 ? (
                            suggestions.map((suggestion) => (<OfferCard key={suggestion.offerid} sug={suggestion} saved={ savedOffers.length > 0 ? savedOffers.find(offer => offer.offerid === suggestion.offerid) : false } />))
                        ) :
                        <p className="w-full px-4 py-10 text-center text-black-80 bg-white-100 border border-black-0 rounded-xl dark:border-none dark:bg-black-10 dark:text-white-60">
                            Pas d'offres
                        </p>
                }
            </div>
        </motion.section>
    );
};

export default Offers;
