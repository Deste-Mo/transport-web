import {useEffect, useRef, useState} from "react";
import Icon from "./Icon.jsx";
import Badge from "./Badge.jsx";
import {motion} from "framer-motion";

const Filter = ({
                    filters = [],
                    filterBoxClassName = "fixed z-50",
                    className = "",
                    filterBoxMainTitle = "Filtrer par",
                    onFilter = () => {
                    },
                    filterResultsName = "currentUserOfferFilter",
                    iconVariant = "secondary",
                    iconSize = "sm"
                }) => {
    const [filterDatas, setFilterDatas] = useState(filters);
    const [loading, setLoading] = useState(true);
    const [filterVisible, setFilterVisible] = useState(false);
    const selectRef = useRef(null);

    const updateFilter = (selectedFilterValue, selectedFilter) => {
        const newFilterDatas = filterDatas?.map((filterData) => {
            if (filterData.title === selectedFilter.title) {
                // TODO : find and update active filter
                const filterValues = filterData.values;

                const newFilterValues = filterValues.map((filterValue) => {
                    return {
                        name: filterValue.name,
                        active: filterValue.name === selectedFilterValue.name,
                    };
                });

                return {
                    ref: filterData.ref,
                    title: filterData.title,
                    values: newFilterValues,
                };
            }
            return filterData;
        });

        const filterDatasSummary = newFilterDatas.map((filterData) => ({
            title: filterData.title,
            activeFilter: filterData?.values?.find((item) => item.active).name,
        }));

        localStorage.setItem(filterResultsName, JSON.stringify(filterDatasSummary));
        setFilterDatas(newFilterDatas);
    };

    useEffect(() => {
        setLoading(true);
        const savedFilters = filters?.map((filter) => {
            const filterDatasSummary = JSON?.parse(
                localStorage.getItem(filterResultsName)
            );

            if (!filterDatasSummary) return filter;

            let newFilter = filter;

            filterDatasSummary.forEach((filterDataSummary) => {
                if (filter.title === filterDataSummary.title) {
                    newFilter = {
                        ...filter,
                        values: filter.values.map((filterValue) => ({
                            name: filterValue.name,
                            active: filterDataSummary.activeFilter === filterValue.name,
                        })),
                    };
                }
            });
            return newFilter;
        });

        setFilterDatas(savedFilters);
        setLoading(false);
    }, []);
    
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (selectRef.current && !selectRef.current.contains(e.target))
                setFilterVisible(false);
        };
        document.addEventListener("mousedown", handleClickOutside);

        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`relative ${className}`}>
            <Icon onClick={() => setFilterVisible(prev => !prev)} icon="bi bi-funnel" size={iconSize}
                  variant={iconVariant}></Icon>
            <motion.div
                ref={selectRef}
                animate={
                    filterVisible
                        ? {opacity: 1, pointerEvents: "auto", scale: 1}
                        : {opacity: 0, pointerEvents: "none", scale: 0.9}
                }
                transition={{
                    duration: 0.2,
                }}
                initial={false}
                className={`bg-white-100 shadow-sm border border-black-0 dark:bg-white-0 p-4 rounded-xl text-black-100 dark:text-white-100 flex flex-col gap-4 items-start justify-center min-w-[320px] max-w-[420px] ${filterBoxClassName}`}
            >
                <div className="flex w-full justify-between items-center">
                    <div className="flex items-center gap-2">
                        <i className="bi bi-funnel text-icon"></i>
                        <p className="text-base">{filterBoxMainTitle}</p>
                    </div>
                    <Icon variant="ghost" icon="bi bi-x-lg" size="sm" onClick={() => setFilterVisible(false)}/>
                </div>
                {loading ? (
                    <p className="text-black-100 dark:text-white-100">Chargement ....</p> // TODO : Filter loading
                ) : (
                    filterDatas?.map((filter) => (
                        <div key={filter.title} className="flex flex-col gap-3 items-start ">
                            <p className="text-small-1">{filter?.title}</p>
                            <div className="flex gap-4 items-center justify-start flex-wrap">
                                {filter.values.map((item) => (
                                    <Badge
                                        onClick={() => {
                                            updateFilter(item, filter);
                                            onFilter();
                                        }}
                                        key={item.name}
                                        active={item.active}
                                        text={item.name}
                                    />
                                ))}
                            </div>
                        </div>
                    ))
                )}
            </motion.div>
        </div>

    );
};

export default Filter;