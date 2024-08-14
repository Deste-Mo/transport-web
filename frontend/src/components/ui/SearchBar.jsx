import PropTypes from "prop-types";
import {globalInputVariants} from "../../styles/globals.input";

const SearchBar = ({
                       className = "",
                       placeholder = "Search something ...",
                       size = globalInputVariants.size.default,
                       radious = globalInputVariants.rounded.default,
                       value,
                       onClick = () => {
                       },
                       setValue = () => {
                       },
                       variant = "outline",
                       block = false
                   }) => {
    const searchBarClassName = `text-primary bg-black-10 flex  items-center  gap-4 ${block ? 'w-full' : globalInputVariants.width} ${globalInputVariants.size[size]}  ${globalInputVariants.rounded[radious]} ${globalInputVariants.variant[variant]} ${className}`;
    return (
        <div className={searchBarClassName}>
            <button
                onClick={() => {
                    onClick(value);
                    setValue("");
                }}
                className="cursor-pointer bi bi-search"
            ></button>
            <input
                type="text"
                className={`flex-1 outline-0 border-0 bg-[rgba(0,0,0,0)] text-black-80 placeholder:text-black-80 dark:placeholder:text-white-60 dark:text-white-60 text-base outline-none`}
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
    );
};

SearchBar.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    size: PropTypes.string,
    radious: PropTypes.string,
    value: PropTypes.string,
    onClick: PropTypes.func,
    setValue: PropTypes.func,
    variant: PropTypes.string,
};

export default SearchBar;
