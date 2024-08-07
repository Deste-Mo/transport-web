
import {useAuth} from "../context/AuthProvider.jsx";
import {SubHeader} from "../components/pages/SubHeader.jsx";
import {appVariants} from "../animations/variants.js";
import {motion} from "framer-motion";
import ExpandableSearchBar from "../components/ui/ExpandableSearchBar.jsx";
import {lazy, Suspense, useEffect} from "react";
import {useOffer} from "../context/OfferProvider.jsx";
import OfferCardLoading from "../components/loader/OfferCardLoading.jsx";
const OfferCard = lazy(() => import("../components/pages/Offer/OfferCard.jsx"))

const Offers = ({userId = null}) => {
    const { personalInformation } = useAuth();
    
    const {suggestedOffers, savedOffers, getSavedOffers, getSuggestedOffers} = useOffer();

    useEffect(() => {
        getSavedOffers();
        getSuggestedOffers();
    }, [])
    
    return (
        <motion.section className="flex flex-col items-center justify-center w-full gap-6" variants={appVariants} initial="hidden" whileInView="visible" viewport={{once : true}}>

            <SubHeader name="Offres" icon="bi bi-briefcase-fill" sticky  rightContent={<ExpandableSearchBar/>}/>
            <div className="flex flex-col items-center justify-center gap-6 w-full">
                {
                    suggestedOffers.length > 0 ? (
                        <Suspense fallback={<OfferCardLoading/>}>
                            {suggestedOffers.map((suggestion) => (<OfferCard key={suggestion.offerid} sug={suggestion} saved={ savedOffers.length > 0 ? savedOffers.find(offer => offer.offerid === suggestion.offerid) : false } />))}
                        </Suspense>
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
