import {SubHeader} from "../../components/pages/SubHeader.jsx";
import OfferCard from "../../components/pages/Offer/OfferCard.jsx";
import {useOffer} from "../../context/OfferProvider.jsx";
import {useEffect} from "react";
import {useAnimation} from "../../context/AnimationProvider.jsx";
import {appVariants} from "../../animations/variants.js";
import {motion} from "framer-motion";

const SavedOffers = () => {
    const {savedOffers} = useOffer();
    const {setShowBackIcon} = useAnimation();

    useEffect(() => {
        setShowBackIcon(true);
    }, [])

    return (
        <motion.section variants={appVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{once: true}}
                        className="flex flex-col gap-6">
            <SubHeader
                name="Offres Sauvegardés"
                icon="bi bi-bookmarks-fill"
                rightContent={
                    <p className="text-black-80 dark:text-white-100">
                        {savedOffers?.length}
                    </p>
                }
            />
            <div className="flex flex-col gap-4 rounded-lg">
                {savedOffers.length > 0 ? (
                    savedOffers.map((savedOffer) => (
                        <OfferCard key={savedOffer.saveid} sug={savedOffer} saved/>
                    ))
                ) : (
                    <p className="w-full px-4 py-10 text-center text-black-80 bg-white-100 border border-black-0 rounded-xl dark:border-none dark:bg-black-10 dark:text-white-60">
                        Pas de sauvegarde pour l'instant
                    </p>
                )}
            </div>
        </motion.section>)
}

export default SavedOffers;