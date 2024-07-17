import PropTypes from "prop-types";

import { defaultTransition } from "../../styles/globals";
import "../../styles/components.style.css";
import { useEffect, useRef, useState } from "react";
import { globalInputVariants } from "../../styles/globals.input";
import globalSelectvariants from "../../styles/globals.select";

const SelectInput = ({
  options = [],
  name = "",
  className = "",
  title = "",
  icon = "bi bi-chevron-right",
  variant = globalInputVariants.variant.default,
  size = "md",
  optionId = "option",
  rounded = globalInputVariants.rounded.default,
  inverseIcon = false,
  loading = options.length <= 0,
  block = false,
  onChange = () => {},
  onError = () => {},
  value = "",
}) => {
  const error = options.length <= 0 || loading;
  const [selectedItem, setSelectedItem] = useState(
    options[0]?.option || "Loading ..."
  );
  const selectRef = useRef(null);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (selectRef.current && !selectRef.current.contains(e.target)) {
        setOpened(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  useEffect(() => {
    onError(error, { target: { name: name } });
  }, [loading]);

  useEffect(() => {
    onChange({ target: { value: selectedItem, name: name } });
  }, [selectedItem]);

  useEffect(() => {
    if (loading) {
      setSelectedItem("Loading ...");
    } else {
      setSelectedItem(
        optionId === "option"
          ? options[0]?.option
          : options[0]?.[optionId] + " : " + options[0]?.option
      );
    }
  }, [loading]);
  return (
    <div ref={selectRef} className={`flex flex-col gap-3 w-full `}>
      <p className="text-base text-black">{title}</p>
      <div
        className={`flex items-start justify-start flex-col gap-2 w-full   relative `}
      >
        <div
          role="button"
          onClick={() => {
            setOpened((prev) => !prev);
          }}
          className={`cursor-pointer ${globalInputVariants.constant} ${
            globalInputVariants.size[size]
          } ${defaultTransition} ${globalSelectvariants.variant[variant]} ${
            globalInputVariants.rounded[rounded]
          }  ${
            block
              ? "w-full"
              : `items-start justify-start ${globalInputVariants.width} `
          } ${className}`}
        >
          {inverseIcon && (
            <i
              className={`${defaultTransition} ${icon} ${
                opened ? "rotate-90" : "rotate-  0"
              }`}
            ></i>
          )}
          <p>{selectedItem}</p>
          {!inverseIcon && (
            <i
              className={`${defaultTransition} ${icon} ${
                opened ? "rotate-90" : "rotate-0"
              }`}
            ></i>
          )}
        </div>
        <ul
          className={`absolute z-40 bg-gray-100 ${block ? "w-full" : globalInputVariants.width} ${
            globalSelectvariants.variant[variant]
          } ${size === "md" ? "top-[54px]" : "top-[64px]"} ${
            opened
              ? "z-30 opacity-1 skew-x-0 "
              : "-z-10 opacity-0 skew-x-[12deg] pointer-events-none"
          }  ${defaultTransition}
            ${globalInputVariants.rounded[rounded]}`}
        >
          {loading ? (
            <li className="flex origin-center justify-center">
              <i className="bi-hourglass-top"></i>
            </li>
          ) : (
            options?.map((item) => (
              <li
                role="button"
                onClick={() => {
                  setSelectedItem(
                    optionId === "option"
                      ? item?.option
                      : item?.[optionId] + " : " + item?.option
                  );
                  setOpened(false);
                }}
                key={item?.[optionId]}
                className={`w-full cursor-pointer hover:bg-primary-40 hover:ps-6 px-4 py-2 rounded-md ${defaultTransition} transition-all`}
              >
                {item?.option?.slice(0, 30)}
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

SelectInput.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object),
  name: PropTypes.string,
  className: PropTypes.string,
  title: PropTypes.string,
  icon: PropTypes.string,
  variant: PropTypes.string,
  size: PropTypes.string,
  optionId: PropTypes.string,
  rounded: PropTypes.string,
  inverseIcon: PropTypes.bool,
  loading: PropTypes.bool,
  block: PropTypes.bool,
  onChange: PropTypes.func,
  onError: PropTypes.func,
  value: PropTypes.string,
};

export default SelectInput;
