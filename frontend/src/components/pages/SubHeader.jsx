import PropTypes from "prop-types";
import { useEffect } from "react";
import { useApp } from "../../context/AppProvider";
import { useUser } from "../../context/UserProvider";

const sizeVariants = {
  padding: {
    md: "px-6 py-4",
    lg: "px-6 py-4",
  },
  text: {
    md: "text-lead text-black-80 max-md:text-base",
    lg: "text-subtitle-3",
  },
};

export function SubHeader({
  name,
  icon,
  sticky = false,
  size = "md",
  rightContent = null,
  hideLeftContent = false,
}) {
  return (
    <div
      className={`flex select-none gap-10 max-md:gap-2 w-full justify-between items-center z-30  rounded-xl shadow-sm  border border-black-0 bg-white-100 sticky top-0 dark:bg-white-0  dark:backdrop-blur-sm   ${
        sticky && "sticky"
      } ${sizeVariants.padding[size]}`}
    >
      {!hideLeftContent && (
        <div
          className={`flex items-center gap-4 text-black-100 text-nowrap dark:text-white-100 ${sizeVariants.text[size]}`}
        >
          <i className={icon + " text-icon"}></i>
          <span>{name}</span>
        </div>
      )}
      {rightContent && (
        <div className="w-full flex justify-end">{rightContent}</div>
      )}
    </div>
  );
}

SubHeader.propTypes = {
  name: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  disableButton: PropTypes.bool,
  sticky: PropTypes.bool,
  profile: PropTypes.bool,
  className: PropTypes.string,
  size: PropTypes.string,
};
