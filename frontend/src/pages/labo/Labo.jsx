import { useEffect, useState } from "react";
import ConfirmPopup from "../../components/ui/ConfirmPopup.jsx";
import ExpandableSearchBar from "../../components/ui/ExpandableSearchBar.jsx";
import Filter from "../../components/ui/Filter.jsx";
import { motion } from "framer-motion";
import SearchFilter from "../../components/pages/SearchFilter.jsx";
import { OFFER_CARD_FILTERS } from "../../constants/index.js";
import { FileInput } from "../../styles/components.js";

const Labo = () => {

  return (
      <FileInput style="modern" className="w-[512px] p-10"/>
    )
};

export default Labo;
