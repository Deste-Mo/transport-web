import PropTypes from "prop-types";
import Badge from "./Badge";
import Icon from "./Icon";

const Filter = ({
  filters = [{}],
  className = "",
  onClose = () => {},
  onFilter = () => {},
}) => {
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
      <div className="flex gap-4 items-center justify-start flex-wrap">
        {filters.map((filter) => (
          <Badge
            key={filter.name}
            text={filter.name}
            active={filter.active}
            onFilter={() => onFilter(filter.name)}
          />
        ))}
      </div>
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
