import PropTypes from "prop-types";
import Badge from "./Badge";
import Icon from "./Icon";
import { useState } from "react";

const Filter = ({
  filters = [{}],
  className = "",
  onClose = () => {},
  onFilter = () => {},
  filterResultsName = "filterResults",
}) => {
  const [filterDatas, setFilterDatas] = useState(filters);

  const updateFilter = (selectedFilterValue, selectedFilter) => {
    const newFilterDatas = filterDatas?.map((filterData) => {
      if (filterData.title === selectedFilter.title) {
        // TODO : find and update active filter
        const filterValues = filterData.values;

        const newFilterValues = filterValues.map((filterValue) => {
          return {
            name: filterValue.name,
            active:
              filterValue.name === selectedFilterValue.name
                ? !selectedFilterValue.active
                : false,
          };
        });

        return {
          ref: filterData.ref,
          title: filterData.title,
          values: newFilterValues,
        };
      } else {
        return filterData;
      }
    });

    const filterDatasSummary = newFilterDatas.map((filterData) => ({
      ref: filterData.ref,
      activeFilter: filterData?.values?.find((item) => item.active).name,
    }));

    console.log(filterDatasSummary);
    setFilterDatas(newFilterDatas);
  };

  return (
    <div
      className={`bg-white-100 dark:bg-white-0 p-4 rounded-xl text-black-100 dark:text-white-100 flex flex-col gap-4 items-start justify-center ${className}`}
    >
      <div className="flex w-full justify-between items-center">
        <div className="flex items-center gap-2">
          <i className="bi bi-filter-circle text-icon"></i>
          <p className="text-base">Filtrer par </p>
        </div>
        <Icon variant="ghost" icon="bi bi-x-lg" size="sm" onClick={onClose} />
      </div>
      {filterDatas.map((filter) => (
        <div key={filter.title} className="flex flex-col gap-3 items-start">
          <p className="text-small-1">{filter?.title}</p>
          <div className="flex gap-4 items-center justify-start flex-wrap">
            {filter.values.map((item) => (
              <Badge
                onClick={() => updateFilter(item, filter)}
                key={item.name}
                active={item.active}
                text={item.name}
              />
            ))}
          </div>
        </div>
      ))}
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
