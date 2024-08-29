import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";
import {motion} from "framer-motion";
import ExpandableSearchBar from "../ui/ExpandableSearchBar";
import FilterBox from "../ui/FilterBox";

const SearchFilter = ({
                          filters = [{}],
                          filterResultsName,
                          setValue,
                          className,
                          block = true,
                          placeholder = "Search something...",
                          radious,
                          size,
                          variant,
                          value,
                          onFilter,
                          onSearchIconClicked,
                      }) => {
    const [filterVisible, setFilterVisible] = useState(false);
    const selectRef = useRef(null);
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (selectRef.current && !selectRef.current.contains(e.target))
                setFilterVisible(false);
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);
    return (
        <div
            className={` ${
                block && "w-full"
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
                onSearch={onSearchIconClicked}
                block={block}

            />
            <motion.div
                animate={
                    filterVisible
                        ? {opacity: 1, pointerEvents: "auto", scale: 1}
                        : {opacity: 0, pointerEvents: "none", scale: 0.9}
                }
                transition={{
                    duration: 0.2,
                }}
                initial={false}
                className="fixed top-[64px] right-2 z-40"
            >
                <div ref={selectRef} className="">
                    <FilterBox
                        filters={filters}
                        onClose={() => setFilterVisible(false)}
                        onFilter={onFilter}
                        filterResultsName={filterResultsName}
                    />
                </div>
            </motion.div>
        </div>
    );
};

SearchFilter.propTypes = {};

export default SearchFilter;
