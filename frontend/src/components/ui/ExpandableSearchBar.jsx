import { useState } from "react";
import Icon from "./Icon";
import PropTypes from "prop-types";
import { globalInputVariants } from "../../styles/globals.input";
import globalIconVariants from "../../styles/global.icon";
import SearchBar from "./SearchBar";

const ExpandableSearchBar = ({
  className = "",
  placeholder = "Search something ...",
  size = "sm",
  radious = "full",
  value = "",
  onClick = () => {},
  setValue = () => {},
  onFilterClick = () => {},
  onSearch = () => {},
  variant = "fill",
  filter = false,
  block = true,
    expanded = false,
}) => {
  const [expand, setExpand] = useState(expanded);

  return (
    <div className={`w-full flex gap-2 items-center justify-end ${className}`}>
      {!expand ? (
        <Icon
          icon="bi bi-search"
          onClick={() => {
            setExpand((prev) => !prev);
            onClick(value);
            setValue("");
            onSearch();
          }}
          size="sm"
          variant="secondary"
        />
      ) : (
        <SearchBar
          radious={radious}
          block={block}
          
          onClick={() => {
            setExpand((prev) => !prev);
            onClick(value);
            setValue("");
            onSearch();
          }}
          placeholder={placeholder}
          setValue={setValue}
          size={size}
          variant={variant}
          value={value}
        />
      )}
      {expand && filter && (
        <Icon
          onClick={onFilterClick}
          icon="bi bi-funnel-fill"
          size="sm"
          variant="secondary"
        />
      )}
    </div>
  );
};


export default ExpandableSearchBar;
