import {useState} from "react";
import Icon from "./Icon";
import PropTypes from "prop-types";
import {globalInputVariants} from "../../styles/globals.input";
import globalIconVariants from "../../styles/global.icon";

const ExpandableSearchBar = ({
                                 className = "",
                                 placeholder = "Search something ...",
                                 size = "sm",
                                 radious = "full",
                                 value = "",
                                 onClick = () => {
                                 },
                                 setValue = () => {
                                 },
                                 onFilterClick = () => {
                                 },
                                 onSearch = () => {
                                 },
                                 variant = "fill",
                                 filter = false,
                                 block = true,
                             }) => {
    const [expand, setExpand] = useState(false);

    const searchBarClassName = `transition-all text-primary  bg-black-10 flex items-center  gap-4
   ${
        expand ? `${globalInputVariants.size[size]} ` : globalIconVariants.size[size]
    }  ${globalInputVariants.rounded[radious]} ${
        globalInputVariants.variant[variant]
    } ${className}`;
    return (
        <div className="flex gap-2">
            <div className={searchBarClassName}>
                <button
                    onClick={() => {
                        setExpand((prev) => !prev);
                        onClick(value);
                        setValue("");
                        onSearch();
                    }}
                    className="cursor-pointer bi bi-search"
                ></button>
                <input
                    type="text"
                    className={`flex-1 transition-color duration-700   outline-0 border-0 bg-[rgba(0,0,0,0)] text-black-80 placeholder:text-black-80 dark:placeholder:text-white-60 dark:text-white-60 text-base outline-none ${
                        expand ? "opacity-1" : "opacity-0"
                    }`}
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Escape") {
                            setValue("");
                        } else if (e.key === "Enter") {
                            setValue(e.target.value);
                        }
                    }}
                />

                {value && (
                    <button
                        onClick={() => setValue("")}
                        className="cursor-pointer bi bi-x-lg"
                    ></button>
                )}
            </div>
            {(expand && filter) && (
                <Icon
                    onClick={onFilterClick}
                    icon="bi bi-filter-circle"
                    size="sm"
                    variant="secondary"
                />
            )}
        </div>
    );
};

export default ExpandableSearchBar;
