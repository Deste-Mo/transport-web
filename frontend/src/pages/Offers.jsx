import { useAuth } from "../context/AuthProvider.jsx";
import { SubHeader } from "../components/pages/SubHeader.jsx";
import OfferCard from "../components/pages/Offer/OfferCard.jsx";
import { appVariants } from "../animations/variants.js";
import { motion } from "framer-motion";
import ExpandableSearchBar from "../components/ui/ExpandableSearchBar.jsx";
import { useApp } from "../context/AppPorvider.jsx";
import { Suspense, useEffect, useState } from "react";
import { useOffer } from "../context/OfferProvider.jsx";
import { useParams } from "react-router-dom";
import { Button } from "../styles/components.js";
import OfferCardLoading from "../components/loader/OfferCardLoading.jsx";

const Offers = () => {
  const { personalInformation } = useAuth();
  const {
    offerLoading,
    suggestedOffers,
    savedOffers,
    getSavedOffers,
    getSuggestedOffers,
    getCurrentUserOffers,
  } = useOffer();
  const { id } = useParams();
  const now = new Date();
  const [search, setSearch] = useState("");
  const [filteredOffers, setFilterefOffers] = useState(suggestedOffers);
  const [searching, setSearching] = useState(false);

  const filterOffers = () => {
    setSearching(true);
    const filter = suggestedOffers.filter(
      ({
        accounttype,
        capacity,
        firstname,
        lastname,
        publicationdate,
        title,
        description,
        depart,
      }) => {
        if (!search) return true;

        const filterResult =
          accounttype?.toLowerCase()?.includes(search?.toLowerCase()) ||
          capacity?.toLowerCase()?.includes(search?.toLowerCase()) ||
          firstname?.toLowerCase()?.includes(search?.toLowerCase()) ||
          lastname?.toLowerCase()?.includes(search?.toLowerCase()) ||
          publicationdate?.toLowerCase()?.includes(search?.toLowerCase()) ||
          title?.toLowerCase()?.includes(search?.toLowerCase()) ||
          description?.toLowerCase()?.includes(search?.toLowerCase());

        return filterResult;
      }
    );
    setFilterefOffers(filter);
    setSearching(false);
  };

  useEffect(() => {
    getSuggestedOffers();
    filterOffers();
  }, []);

  useEffect(() => {
    getSavedOffers();
    getSuggestedOffers();
    filterOffers();
    if (id) getCurrentUserOffers(id);
  }, [id]);

  useEffect(() => {
    filterOffers();
  }, [search]);

  return (
    <motion.section
      className="flex flex-col items-center justify-center w-full gap-6"
      variants={appVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <SubHeader
        name="Offres"
        icon="bi bi-briefcase-fill"
        sticky
        rightContent={
          suggestedOffers?.length > 0 && (
            <ExpandableSearchBar
              variant="fill"
              size="sm"
              radious="full"
              value={search}
              placeholder="Rechercher une offre"
              setValue={setSearch}
            />
          )
        }
      />
      <div className="flex flex-col items-center justify-center gap-6 w-full">
        {filteredOffers?.length > 0 ? (
          filteredOffers.map((suggestion) => (
            <Suspense fallback={<OfferCardLoading />}>
              <OfferCard
                key={suggestion.offerid}
                sug={suggestion}
                saved={
                  savedOffers?.length > 0
                    ? savedOffers.find(
                        (offer) => offer.offerid === suggestion.offerid
                      )
                    : false
                }
              />
            </Suspense>
          ))
        ) : (
          <div className="dark:text-white-100">Pas d'offres</div>
        )}
      </div>
    </motion.section>
  );
};

export default Offers;
