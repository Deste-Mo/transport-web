import { useAuth } from "../context/AuthProvider.jsx";
import { SubHeader } from "../components/pages/SubHeader.jsx";
import OfferCard from "../components/pages/Offer/OfferCard.jsx";
import { Icon } from "../styles/components.js";
import { appVariants } from "../animations/variants.js";
import { motion } from "framer-motion";
import { useApp } from "../context/AppPorvider.jsx";
import { useEffect, useState } from "react";
import {Button} from "../styles/components.js";

const Offers = () => {
    const { personalInformation, logout, setRegistrationStep } = useAuth();

    const { handleOfferSuggestion,handleHomeOffers,homeoffers, suggestions, handleOffersSaved, savedOffers } = useApp();

    const [filter, setFilter] = useState('all');
    const [recent, setRecent] = useState(false);

    const changeFilter = (value)=>{
        console.log(value);
        setFilter(value);
        setRecent(false);
    }

    const filterOffers = ()=>{

        const now = new Date();

        return homeoffers.filter( (offer)=>{
            if( filter === 'all'){
                return true;
            }else if( filter === 'week'){

                const scheduledDate = new Date(offer.scheduleddate);
                const oneWeekBefore = new Date(scheduledDate);
                oneWeekBefore.setDate(scheduledDate.getDate() - 7);

                return oneWeekBefore <= now && now <= scheduledDate;
            }else if(filter === 'followed'){

                return offer.isfollowed
            }

            return false;

        })
    }

    useEffect(() => {
        // handleOfferSuggestion();
        handleHomeOffers();
        handleOffersSaved();
    }, [])

    const user = personalInformation;

    return (
        <motion.section className="flex flex-col items-center justify-center w-full gap-6" variants={appVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>

            <SubHeader name="Offres" icon="bi bi-briefcase-fill" sticky rightContent={<Icon size="sm" variant="secondary" icon="bi bi-search" />} />
            <div className=" flex w-full h-fit bg-white-100 justify-around overflow-auto p-2 rounded-2xl scrollbar-none sticky top-0">

                <Button className=" bg-primary-40 h-fit" children="Tout" rounded="full"  onClick={()=> changeFilter('all')}/>
                <Button className=" bg-primary-40 h-fit" children="Recent" rounded="full" onClick={()=> setRecent(true)}/>
                <Button className=" bg-primary-40 h-fit" children="Proche du départ" rounded="full"  onClick={()=> changeFilter('week')}/>
                <Button className=" bg-primary-40 h-fit" children="Suivi" rounded="full" onClick={()=> changeFilter('followed')} />

            </div>
            <div className="flex flex-col items-center justify-center gap-6 w-full relative">
            
               {(recent)? (
                     (suggestions.length > 0 )? (
                        suggestions.map((suggestion) => (<OfferCard key={suggestion.offerid} sug={suggestion} saved={ savedOffers.length > 0 ? savedOffers.find(offer => offer.offerid === suggestion.offerid) : false } />))
                    ) :
                        <div>No offers Recent </div>
                ):
                (
                   (filterOffers().length > 0) ? (
                        filterOffers().map((homeoffer) => (<OfferCard key={homeoffer.offerid} sug={homeoffer} saved={ savedOffers.length > 0 ? savedOffers.find(offer => offer.offerid === homeoffer.offerid) : false }/>))
                    ) :                       
                    <div>No offer</div>
                )}
            </div>
        </motion.section>
    );
};

export default Offers;
