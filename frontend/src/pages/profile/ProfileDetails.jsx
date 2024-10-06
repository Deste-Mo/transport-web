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
import ExpandableSearchBar from "../../components/ui/ExpandableSearchBar.jsx";
import OtherUserOfferList from "../../components/pages/OtherUserOfferList.jsx";


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
                {currentUser.id === id ? <NewOffer/> : <OtherUserOfferList/>}
            </div>
        </section>
    );
};
export default ProfileDetails;

