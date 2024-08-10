import { useState } from "react";
import ConfirmPopup from "../../components/ui/ConfirmPopup.jsx";
import ExpandableSearchBar from "../../components/ui/ExpandableSearchBar.jsx";
import Filter from "../../components/ui/Filter.jsx";
import { motion } from "framer-motion";
import SearchFilter from "../../components/pages/SearchFilter.jsx";
import { OFFER_CARD_FILTERS } from "../../constants/index.js";



const Labo = () => {
  return (
   <SearchFilter filters={OFFER_CARD_FILTERS} filterResultsName="offerCardFilters"/>
  );
};

export default Labo;
