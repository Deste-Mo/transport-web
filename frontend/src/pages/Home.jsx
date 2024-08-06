import {useAuth} from "../context/AuthProvider.jsx";
import {SubHeader} from "../components/pages/SubHeader.jsx";
import {motion} from "framer-motion";
import {appVariants} from "../animations/variants.js";
import ExpandableSearchBar from "../components/ui/ExpandableSearchBar.jsx";
import { lazy, useEffect} from "react";
import {useApp} from "../context/AppPorvider.jsx";
const OfferCard = lazy(() => import("../components/pages/Offer/OfferCard.jsx"))


const Home = () => {
    const { personalInformation, logout, setRegistrationStep } = useAuth();
    const user = personalInformation;

    const { handleHomeOffers, homeOffers, handleOffersSaved, savedOffers } = useApp();

    useEffect(() => {
        handleHomeOffers();
        handleOffersSaved();
    }, [])


    return (
        <motion.section className="flex flex-col items-center justify-center w-full gap-6" variants={appVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <SubHeader name="Actualites" icon="bi bi-grid-fill" rightContent={<ExpandableSearchBar />} />
            <div className="flex flex-col items-center justify-center gap-[64px] w-full ">
                {
                    homeOffers.length > 0 ? (
                        homeOffers.map((homeoffer) => (<OfferCard key={homeoffer.offerid} sug={homeoffer} saved={ savedOffers.length > 0 ? savedOffers.find(offer => offer.offerid === homeoffer.offerid) : false }/>))
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
