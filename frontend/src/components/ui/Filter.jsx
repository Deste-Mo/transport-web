import PropTypes from "prop-types";
import Badge from "./Badge";
import Icon from "./Icon";
import { useEffect, useState } from "react";

const Filter = ({
  filters = [{}],
  className = "",
  onClose = () => {},
  onFilter = () => {},
  filterResultsName = "filterResults",
}) => {
  const [filterDatas, setFilterDatas] = useState(filters);
  const [loading, setLoading] = useState(true);

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

  return (
    <div
      className={`bg-white-100 sahdow-sm border border-black-0 dark:bg-white-0 p-4 rounded-xl text-black-100 dark:text-white-100 flex flex-col gap-4 items-start justify-center ${className}`}
    >
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-2">
          <i className="bi bi-filter-circle text-icon"></i>
          <p className="text-base">Filtrer par </p>
        </div>
        <Icon variant="ghost" icon="bi bi-x-lg" size="sm" onClick={onClose} />
      </div>
      {loading ? (
        <p className="text-black-100 dark:text-white-100">Loading ....</p> // TODO : Filter loading
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
    </div>
  );
};

Filter.propTypes = {
  filters: PropTypes.array,
  className: PropTypes.string,
  onClose: PropTypes.func,
  onFilter: PropTypes.func,
};

export default Filter;
