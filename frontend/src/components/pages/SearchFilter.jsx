import React, { useState } from "react";
import PropTypes from "prop-types";
import { motion } from "framer-motion";
import ExpandableSearchBar from "../ui/ExpandableSearchBar";
import Filter from "../ui/Filter";

const SearchFilter = ({
  filters = [{}],
  filterResultsName,
  setValue,
  className,
  block = false,
  placeholder = "Search something...",
  radious,
  size,
  variant,
  value,
  onFilter,
}) => {
  const [filterVisible, setFilterVisible] = useState(false);
  return (
    <div
      className={` ${
        block ? "w-full" : "w-min"
      } relative ${className}`}
    >
      <ExpandableSearchBar
        onFilterClick={() => setFilterVisible((prev) => !prev)}
        setValue={setValue}
        placeholder={placeholder}
        value={value}
        variant={variant}
        radious={radious}
        size={size}
        filter
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
        className="fixed top-[64px] right-2 z-40"
      >
        <Filter
          filters={filters}
          onClose={() => setFilterVisible(false)}
          onFilter={onFilter}
          filterResultsName={filterResultsName}
        />
      </motion.div>
    </div>
  );
};

SearchFilter.propTypes = {};

export default SearchFilter;
