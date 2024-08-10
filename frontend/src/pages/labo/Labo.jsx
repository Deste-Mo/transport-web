import { useState } from "react";
import ConfirmPopup from "../../components/ui/ConfirmPopup.jsx";
import ExpandableSearchBar from "../../components/ui/ExpandableSearchBar.jsx";
import Filter from "../../components/ui/Filter.jsx";
import { motion } from "framer-motion";

const filters = [
  {
    ref: "accounttype",
    title: "Type de compte",
    values: [
      {
        name: "Client",
        active: true,
      },
      {
        name: "Entreprise",
        active: false,
      },
    ],
  },
  {
    ref: "publicationdate",
    title: "Date de publication",
    values: [
      {
        name: "Aujourd'hui",
        active: true,
      },
      {
        name: "Récente",
        active: false,
      },
      {
        name: "Ancienne",
        active: false,
      },
    ],
  },
];

const Labo = () => {
  const [filterVisible, setFilterVisible] = useState(false);
  return (
    <div className="p-6 dark:bg-black-100 h-screen space-y-4 w-min">
      <ExpandableSearchBar
        onFilterClick={() => setFilterVisible((prev) => !prev)}
      />
      <motion.div
        animate={
          filterVisible
            ? { opacity: 1, pointerEvents: "auto" }
            : { opacity: 0, pointerEvents: "none" }
        }
        transition={{
          duration: 0.1,
        }}
        initial={false}
      >
        <Filter filters={filters} onClose={() => setFilterVisible(false)} />
      </motion.div>
    </div>
  );
};

export default Labo;
