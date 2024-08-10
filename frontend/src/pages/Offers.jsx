import { useAuth } from "../context/AuthProvider.jsx";
import { SubHeader } from "../components/pages/SubHeader.jsx";
import OfferCard from "../components/pages/Offer/OfferCard.jsx";
import { appVariants } from "../animations/variants.js";
import { motion } from "framer-motion";
import ExpandableSearchBar from "../components/ui/ExpandableSearchBar.jsx";
import { useApp } from "../context/AppPorvider.jsx";
import { useEffect, useState } from "react";
import { useOffer } from "../context/OfferProvider.jsx";
import { useParams } from "react-router-dom";
import { Button } from "../styles/components.js";

const Offers = () => {
  const { personalInformation } = useAuth();

  const [filter, setFilter] = useState("all");
  const [recent, setRecent] = useState(false);

  const changeFilter = (value) => {
    setFilter(value);
    setRecent(false);
  };

  const {
    suggestedOffers,
    savedOffers,
    getSavedOffers,
    getSuggestedOffers,
    getCurrentUserOffers,
  } = useOffer();
  const user = personalInformation;

  const { id } = useParams();

  const [search, setSearch] = useState("");

  const now = new Date();

  const filterOffers = () => {
    return suggestedOffers.length > 0
      ? suggestedOffers.filter((offer) => {
        
          if (filter === "all") {
            return true;
          } else if (filter === "week") {
            const scheduledDate = new Date(offer.scheduleddate);
            const oneWeekBefore = new Date(scheduledDate);
            oneWeekBefore.setDate(scheduledDate.getDate() - 7);

            return oneWeekBefore <= now && now <= scheduledDate;
          } else if (filter === "followed") {
            return offer.isfollowed;
          }

          return false;
        })
      : false;
  };

  const SearchOffres =
    suggestedOffers.length > 0
      ? suggestedOffers.filter((suggestion) => {
          let fullName =
            suggestion.firstname.toLowerCase() +
            " " +
            (suggestion.lastname ? suggestion.lastname.toLowerCase() : "");
          if (
            search &&
            !suggestion.title.toLowerCase().includes(search.toLowerCase()) &&
            !suggestion.depart.toLowerCase().includes(search.toLowerCase()) &&
            !suggestion.dest.toLowerCase().includes(search.toLowerCase()) &&
            !suggestion.capacity.toLowerCase().includes(search.toLowerCase()) &&
            !fullName.toLowerCase().includes(search.toLowerCase()) &&
            !suggestion.accounttype
              .toLowerCase()
              .includes(search.toLowerCase()) &&
            !suggestion.description.toLowerCase().includes(search.toLowerCase())
          ) {
            return false;
          }
          return true;
        })
      : null;

  useEffect(() => {
    getSavedOffers();
    getSuggestedOffers();
    if (id) getCurrentUserOffers(id);
  }, [id]);

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
              placeholder="Rechercher un offre"
              setValue={setSearch}
            />
          )
        }
      />

      {suggestedOffers.length > 0 && (
        <div className=" flex w-full h-fit bg-white-100 dark:bg-black-10 justify-around overflow-auto p-2 rounded-2xl scrollbar-none sticky top-0">
          <Button
            className=" bg-primary-40 h-fit p-0 dark:text-white-100"
            children="Tout"
            rounded="full"
            onClick={() => changeFilter("all")}
          />
          <Button
            className=" bg-primary-40 h-fit p-0 dark:text-white-100"
            children="Recent"
            rounded="full"
            onClick={() => setRecent(true)}
          />
          <Button
            className=" bg-primary-40 h-fit p-0 dark:text-white-100"
            children="Proche du départ"
            rounded="full"
            onClick={() => changeFilter("week")}
          />
          <Button
            className=" bg-primary-40 h-fit p-0 dark:text-white-100"
            children="Suivi"
            rounded="full"
            onClick={() => changeFilter("followed")}
          />
        </div>
      )}
      <div className="flex flex-col items-center justify-center gap-6 w-full">
        {search ? (
          SearchOffres?.length > 0 ? (
            SearchOffres.map((suggestion) => (
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
            ))
          ) : (
            <div className="dark:text-white-100">No offers</div>
          )
        ) : recent ? (
          suggestedOffers?.length > 0 ? (
            suggestedOffers?.map((suggestion) => (
              <OfferCard
                key={suggestion.offerid}
                sug={suggestion}
                saved={
                  savedOffers.length > 0
                    ? savedOffers.find(
                        (offer) => offer.offerid === suggestion.offerid
                      )
                    : false
                }
              />
            ))
          ) : (
            <div className="dark:text-white-100">No offers Recent </div>
          )
        ) : filterOffers().length > 0 ? (
          filterOffers().map((suggestions) => (
            <OfferCard
              key={suggestions.offerid}
              sug={suggestions}
              saved={
                savedOffers.length > 0
                  ? savedOffers.find(
                      (offer) => offer.offerid === suggestions.offerid
                    )
                  : false
              }
            />
          ))
        ) : (
          <div className="dark:text-white-100">No offer</div>
        )}
      </div>
    </motion.section>
  );
};

export default Offers;
