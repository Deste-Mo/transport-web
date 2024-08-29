import { useAuth } from "../context/AuthProvider.jsx";
import { SubHeader } from "../components/pages/SubHeader.jsx";
import { appVariants } from "../animations/variants.js";
import { motion } from "framer-motion";
import { lazy, Suspense, useEffect, useState } from "react";
import { useOffer } from "../context/OfferProvider.jsx";
import { useParams } from "react-router-dom";
import OfferCardLoading from "../components/loader/OfferCardLoading.jsx";
import SearchFilter from "../components/pages/SearchFilter.jsx";

const OfferCard = lazy(() => import("../components/pages/Offer/OfferCard.jsx"));
import {
  OFFER_CARD_FILTERS,
  OFFER_CARD_FILTERS_MODE,
  OFFER_CARD_FILTERS_TITLES,
} from "../constants/index.js";
import OfferFeed from "../components/pages/Offer/OfferFeed.jsx";

const Offers = () => {
  const {
    suggestedOffers,
    savedOffers,
    getSavedOffers,
    getSuggestedOffers,
    getOfferById,
    filterOffers
  } = useOffer();
  const [search, setSearch] = useState("");
  const [filteredOffers, setFilteredOffers] = useState(suggestedOffers);
  
  useEffect(() => {
    getSavedOffers();
    getSuggestedOffers();
  }, []);

  useEffect(() => {
    localStorage.getItem("offerNotifId") &&
    getOfferById(localStorage.getItem("offerNotifId"))
  }, [search]);
  
  useEffect(() => {
    setFilteredOffers(filterOffers(search, suggestedOffers));
  }, [search, suggestedOffers]);

  return (
    <motion.section
      id="offers"
      className="flex flex-col items-center justify-center w-full gap-6"
      variants={appVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <SubHeader
        name="Offres"
        icon="bi bi-truck"
        sticky
        rightContent={
          suggestedOffers?.length > 0 && (
            <SearchFilter
              filterResultsName="offerCardFilter"
              filters={OFFER_CARD_FILTERS}
              variant="fill"
              size="sm"
              radious="full"
              value={search}
              placeholder="Rechercher une offre"
              setValue={setSearch}
              onFilter={() =>  setFilteredOffers(filterOffers(search, suggestedOffers))
              }
            />
          )
        }
      />
      <div className="flex flex-col items-center justify-center gap-6 w-full">
        {
          filteredOffers?.length > 0 ? (
              <Suspense fallback={<OfferCardLoading/>}>
                {filteredOffers?.map((filteredOffer) => (
                    <OfferCard
                        key={filteredOffer.offerid}
                        sug={filteredOffer}
                        saved={
                          savedOffers?.length > 0
                              ? savedOffers.find(
                                  (offer) => offer.offerid === filteredOffer.offerid
                              )
                              : false
                        }
                    />
                ))}
              </Suspense>
          ) : (
              <div className="nothing-box">Pas d'offres</div>
          )
        }
      </div>
    </motion.section>
  );
};

export default Offers;
