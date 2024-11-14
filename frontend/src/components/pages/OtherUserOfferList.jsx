import {useAuth} from "../../context/AuthProvider.jsx";
import {useOffer} from "../../context/OfferProvider.jsx";
import {lazy, Suspense, useEffect, useState} from "react";
import {motion} from "framer-motion";
import {appVariants} from "../../animations/variants.js";
import {SubHeader} from "./SubHeader.jsx";
import SearchFilter from "./SearchFilter.jsx";
import {OFFER_CARD_FILTERS_PROFILE} from "../../constants/index.js";
import OfferCardLoading from "../loader/OfferCardLoading.jsx";

const OfferCard = lazy(() => import("../../components/pages/Offer/OfferCard.jsx"));


const OtherUserOfferList = () => {
    const {profileInfo} = useAuth();
    const {currentUserOffers, savedOffers, filterOffers, getSavedOffers} = useOffer();
    const [search, setSearch] = useState("");
    const [filteredOffers, setFilteredOffers] = useState(currentUserOffers);

    useEffect(() => {
        setFilteredOffers(currentUserOffers);
    }, [currentUserOffers])

    useEffect(() => {
        setFilteredOffers(filterOffers(search, currentUserOffers));
    }, [search, currentUserOffers]);

    return (
        <motion.section
            id="offers"
            className="flex flex-col items-center justify-center w-full gap-6"
            variants={appVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{once: true}}
        >
            {/*User Offer*/}
            <SubHeader
                name="Offres"
                icon="bi bi-truck"
                sticky
                rightContent={
                    currentUserOffers?.length > 0 && (
                        <SearchFilter
                            className="max-[990px]:hidden"
                            filterResultsName="offerCardFilter"
                            filters={OFFER_CARD_FILTERS_PROFILE}
                            variant="fill"
                            size="sm"
                            radious="full"
                            value={search}
                            placeholder="Rechercher une offre"
                            setValue={setSearch}
                            onFilter={() => {
                                setFilteredOffers(filterOffers(search, currentUserOffers))
                            }
                            }
                        />
                    )
                }
            />
            {/*Mobile search Filter*/}
            <SearchFilter
                expanded
                className="hidden max-[990px]:block"
                filterResultsName="offerCardFilter"
                filters={OFFER_CARD_FILTERS_PROFILE}
                variant="fill"
                size="sm"
                radious="full"
                value={search}
                placeholder="Rechercher une offre"
                setValue={setSearch}
                onFilter={() => {
                    setFilteredOffers(filterOffers(search, currentUserOffers))
                }
                }
            />

            <div className="flex flex-col items-center justify-center gap-6 w-full">
                {
                    filteredOffers.length > 0 && (
                        <Suspense fallback={<OfferCardLoading/>}>
                            {filteredOffers.map((currentUserOffer) => (
                                <OfferCard
                                    key={currentUserOffer.offerid}
                                    sug={currentUserOffer}
                                    saved={
                                        savedOffers?.length > 0
                                            ? savedOffers.find(
                                                (offer) => offer.offerid === currentUserOffer.offerid
                                            )
                                            : false
                                    }
                                />
                            ))}
                        </Suspense>)
                }
                {currentUserOffers.length <= 0 &&
                    <p className="nothing-box">{profileInfo.firstname + " n' a pas d'offre pour le moment"}</p>
                }
                {filteredOffers.length <= 0 &&
                    <p className="nothing-box">{"Aucune offre trouvé"}</p>}
            </div>
        </motion.section>)
}

export default OtherUserOfferList