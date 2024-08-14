import { SubHeader } from "../components/pages/SubHeader.jsx";
import { motion } from "framer-motion";
import { appVariants } from "../animations/variants.js";
import ExpandableSearchBar from "../components/ui/ExpandableSearchBar.jsx";
import { Suspense, lazy, useEffect } from "react";
import { useOffer } from "../context/OfferProvider.jsx";
import { useAuth } from "../context/AuthProvider.jsx";
import OfferCardLoading from "../components/loader/OfferCardLoading.jsx";
const OfferCard = lazy(() => import("../components/pages/Offer/OfferCard.jsx"))

const Home = () => {
    const { getOffers, offers, savedOffers, getSavedOffers } = useOffer();
    const { personalInformation } = useAuth();
    const user = personalInformation;
    useEffect(() => {
        getOffers();
        getSavedOffers();
    }, [])
    
    return (
        <motion.section className="flex flex-col items-center justify-center gap-6 w-full " variants={appVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <SubHeader name="Actualites" icon="bi bi-grid-fill" rightContent={<ExpandableSearchBar />} />
            <div className="flex flex-col items-center justify-center gap-[64px] w-full ">
                {
                    offers?.length > 0 ? (
                        <Suspense fallback={<OfferCardLoading/>}>
                            {offers.map((offer) => (<OfferCard key={offer.offerid} sug={offer} saved={ savedOffers.length > 0 ? savedOffers.find(savedOffer => savedOffer.offerid === offer.offerid) : false }/>))}
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

export default Home;
