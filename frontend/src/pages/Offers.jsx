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
import SearchFilter from "../components/pages/SearchFilter.jsx";
import {
  OFFER_CARD_FILTERS,
  OFFER_CARD_FILTERS_MODE,
  OFFER_CARD_FILTERS_TITLES,
} from "../constants/index.js";

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
    const filterModes = JSON?.parse(localStorage.getItem("offerCardFilter"));
    let filteredResult = suggestedOffers;

    const filterByAccountType = (accountTypeFilter) => {
      const accountTypeFilterMode = OFFER_CARD_FILTERS_MODE.accountType;
      switch (accountTypeFilter.activeFilter) {
        case accountTypeFilterMode.client: {
          // TODO : filter by client
          filteredResult = filteredResult.filter(
            ({ accounttype }) =>
              accounttype.toLowerCase() ===
              accountTypeFilterMode.client.toLowerCase()
          );
          break;
        }

        case accountTypeFilterMode.entreprise: {
          // TODO : filter by enterprise
          filteredResult = filteredResult.filter(
            ({ accounttype }) =>
              accounttype.toLowerCase() ===
              accountTypeFilterMode.entreprise.toLowerCase()
          );
          break;
        }

        default:
          break;
      }
    };

    const filterByPostDate = (postDateFilter) => {
      const postDateFilterMode = OFFER_CARD_FILTERS_MODE.postDate;

      switch (postDateFilter.activeFilter) {
        case postDateFilterMode.today: {
          filteredResult = filteredResult.filter(({ publicationdate }) => {
            const postDate = new Date(publicationdate);
            const today = new Date();

            return (
              postDate.getFullYear() === today.getFullYear() &&
              postDate.getMonth() === today.getMonth() &&
              postDate.getDate() === today.getDate()
            );
          });
        }

        case postDateFilterMode.recent: {
          filteredResult.sort(({ publicationdate }) => {
            return new Date().getTime() - new Date(publicationdate).getTime();
          });
        }

        case postDateFilterMode.old: {
          filteredResult.sort(({ publicationdate }) => {
            return new Date(publicationdate).getTime() - new Date().getTime();
          });
        }
      }
    };

    for (const filterMode of filterModes) {
      if (filterMode.title === OFFER_CARD_FILTERS_TITLES.accountType)
        filterByAccountType(filterMode);
      if (filterMode.title === OFFER_CARD_FILTERS_TITLES.postDate)
        filterByPostDate(filterMode);
    }

    filteredResult = filteredResult.filter(
      ({
        accounttype,
        capacity,
        firstname,
        lastname,
        title,
        description,
        depart,
      }) => {
        if (!search) return true;

        return (
          accounttype?.toLowerCase()?.includes(search?.toLowerCase()) ||
          capacity?.toLowerCase()?.includes(search?.toLowerCase()) ||
          firstname?.toLowerCase()?.includes(search?.toLowerCase()) ||
          lastname?.toLowerCase()?.includes(search?.toLowerCase()) ||
          title?.toLowerCase()?.includes(search?.toLowerCase()) ||
          description?.toLowerCase()?.includes(search?.toLowerCase())
        );
      }
    );

    setFilterefOffers(filteredResult);
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
            <SearchFilter
              filterResultsName="offerCardFilter"
              filters={OFFER_CARD_FILTERS}
              variant="fill"
              size="sm"
              radious="full"
              value={search}
              placeholder="Rechercher une offre"
              setValue={setSearch}
              onFilter={filterOffers}
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
