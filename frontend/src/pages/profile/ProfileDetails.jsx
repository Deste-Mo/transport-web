import {useParams} from "react-router-dom";
import {useAuth} from "../../context/AuthProvider";
import NewOffer from "../offer/NewOffer";
import {lazy, Suspense, useEffect, useState} from "react";
import Profile from "./Profile.jsx";
import {appVariants} from "../../animations/variants.js";
import {SubHeader} from "../../components/pages/SubHeader.jsx";
import SearchFilter from "../../components/pages/SearchFilter.jsx";
import {OFFER_CARD_FILTERS, OFFER_CARD_FILTERS_PROFILE} from "../../constants/index.js";
import {motion} from "framer-motion";
import {useOffer} from "../../context/OfferProvider.jsx";
import OfferCardLoading from "../../components/loader/OfferCardLoading.jsx";

const OfferCard = lazy(() => import("../../components/pages/Offer/OfferCard.jsx"));

const ProfileDetails = () => {
    const {personalInformation} = useAuth();
    const {getCurrentUserOffers} = useOffer();
    const currentUser = personalInformation;
    const {id} = useParams();

    useEffect(() => {
        getCurrentUserOffers(id);
    }, [id])

    return (
        <section className="w-full">
            <div className="md:hidden">
                <Profile/>
            </div>
            <div className="max-md:hidden">
                {currentUser.id === id ? <NewOffer/> : <UserOffer/>}
            </div>
        </section>
    );
};
export default ProfileDetails;

const UserOffer = () => {
    const {profileInfo} = useAuth();
    const {currentUserOffers, savedOffers, filterOffers, getSavedOffers} = useOffer();
    const [search, setSearch] = useState("");
    const [filteredOffers, setFilteredOffers] = useState(currentUserOffers);

    useEffect(() => {
        setFilteredOffers(currentUserOffers);
    }, [currentUserOffers])

    useEffect(() => {
        setFilteredOffers(filterOffers(search, currentUserOffers));
      }, [search]);

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
            <div className="flex flex-col items-center justify-center gap-6 w-full">
                {
                    filteredOffers.length > 0 ? (
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
                        </Suspense>
                    ) : <p className="nothing-box">{profileInfo.firstname + " n' a pas d'offre pour le moment"}</p>
                }
            </div>
        </motion.section>)
}
