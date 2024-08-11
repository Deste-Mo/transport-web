import { useEffect, useState } from "react";
import ConfirmPopup from "../../components/ui/ConfirmPopup.jsx";
import ExpandableSearchBar from "../../components/ui/ExpandableSearchBar.jsx";
import Filter from "../../components/ui/Filter.jsx";
import { motion } from "framer-motion";
import SearchFilter from "../../components/pages/SearchFilter.jsx";
import { OFFER_CARD_FILTERS } from "../../constants/index.js";

const Labo = () => {
  const actualDate = "2024-07-29T06:51:19.000Z";
  const [result, setResult] = useState("");
  const [load, setLoad] = useState(true);
  useEffect(() => {
    let d = new Date(actualDate);;
    setResult(`${d.getDate()} ${d.getMonth()} ${d.getFullYear()}`);
    setLoad(false);
  }, []);
  return (
    !load && (
      <p className="text-white-100 p-4">
        {actualDate} : {result}
      </p>
    )
  );
};

export default Labo;
